import {
  ApplicationStatus,
  EvidenceFileType,
  EvidenceOwnerType,
  Prisma,
  UserRole,
} from "@prisma/client";
import crypto from "crypto";
import { randomUUID } from "crypto";
import { Readable } from "stream";
import { prisma } from "../../lib/prisma";
import { downloadObject, removeObject, uploadObject } from "../../lib/s3";
import { ApiError } from "../../utils/api-error";

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function inferFileType(mimeType: string): EvidenceFileType {
  if (mimeType === "application/pdf") {
    return "PDF";
  }
  throw new ApiError(400, "400_VALIDATION_ERROR", "Only PDF files are allowed");
}

async function ensureOwnerExists(ownerType: EvidenceOwnerType, ownerId: string) {
  if (ownerType === "APPLICATION") {
    const exists = await prisma.activityApplication.findUnique({ where: { id: ownerId } });
    if (!exists) {
      throw new ApiError(404, "404_NOT_FOUND", "Application not found");
    }
  } else {
    const exists = await prisma.studentActivityRecord.findUnique({ where: { id: ownerId } });
    if (!exists) {
      throw new ApiError(404, "404_NOT_FOUND", "Record not found");
    }
  }
}

async function ensureOwnerPermission(
  actor: { id: string; role: UserRole },
  ownerType: EvidenceOwnerType,
  ownerId: string,
) {
  if (["SUPER_ADMIN", "FACULTY_ADMIN", "DEPT_STAFF", "TEACHER"].includes(actor.role)) {
    return;
  }

  if (ownerType === "APPLICATION") {
    const app = await prisma.activityApplication.findUnique({ where: { id: ownerId } });
    if (!app || app.studentUserId !== actor.id) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission for this application file");
    }
  } else {
    const record = await prisma.studentActivityRecord.findUnique({ where: { id: ownerId } });
    if (!record || record.studentUserId !== actor.id) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission for this record file");
    }
  }
}

async function enforceEvidenceRule(ownerType: EvidenceOwnerType, ownerId: string) {
  const files = await prisma.evidenceFile.findMany({
    where: { ownerType, ownerId },
  });

  if (files.length > 0) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Only one PDF evidence file is allowed");
  }
}

export async function uploadEvidenceFile(params: {
  actor: { id: string; role: UserRole };
  ownerType: EvidenceOwnerType;
  ownerId: string;
  file: Express.Multer.File;
}) {
  const { actor, ownerType, ownerId, file } = params;

  await ensureOwnerExists(ownerType, ownerId);
  await ensureOwnerPermission(actor, ownerType, ownerId);

  const fileType = inferFileType(file.mimetype);

  await enforceEvidenceRule(ownerType, ownerId);

  const checksum = crypto.createHash("sha256").update(file.buffer).digest("hex");
  const key = `${ownerType.toLowerCase()}/${ownerId}/${randomUUID()}_${sanitizeFilename(file.originalname)}`;

  await uploadObject({
    key,
    body: file.buffer,
    contentType: file.mimetype,
  });

  return prisma.evidenceFile.create({
    data: {
      ownerType,
      ownerId,
      fileType,
      objectKey: key,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      checksum,
      uploadedById: actor.id,
    },
  });
}

export async function listFiles(actor: { id: string; role: UserRole }, query: { ownerType?: EvidenceOwnerType; ownerId?: string }) {
  const where: Prisma.EvidenceFileWhereInput = {
    ownerType: query.ownerType,
    ownerId: query.ownerId,
  };

  if (actor.role === "STUDENT") {
    const apps = await prisma.activityApplication.findMany({
      where: { studentUserId: actor.id },
      select: { id: true },
    });
    const records = await prisma.studentActivityRecord.findMany({
      where: { studentUserId: actor.id },
      select: { id: true },
    });

    where.OR = [
      {
        ownerType: "APPLICATION",
        ownerId: { in: apps.map((item) => item.id) },
      },
      {
        ownerType: "RECORD",
        ownerId: { in: records.map((item) => item.id) },
      },
    ];
  }

  return prisma.evidenceFile.findMany({
    where,
    orderBy: { uploadedAt: "desc" },
  });
}

export async function downloadFile(fileId: string) {
  const file = await prisma.evidenceFile.findUnique({ where: { id: fileId } });

  if (!file) {
    throw new ApiError(404, "404_NOT_FOUND", "File not found");
  }

  const body = await downloadObject(file.objectKey);

  if (!body || !(body instanceof Readable)) {
    throw new ApiError(500, "500_INTERNAL_ERROR", "File stream is unavailable");
  }

  return {
    file,
    stream: body,
  };
}

export async function deleteFile(actor: { id: string; role: UserRole }, fileId: string) {
  const file = await prisma.evidenceFile.findUnique({ where: { id: fileId } });

  if (!file) {
    throw new ApiError(404, "404_NOT_FOUND", "File not found");
  }

  if (actor.role === "STUDENT") {
    await ensureOwnerPermission(actor, file.ownerType, file.ownerId);

    if (file.ownerType === "APPLICATION") {
      const application = await prisma.activityApplication.findUnique({ where: { id: file.ownerId } });
      if (!application || application.status !== ApplicationStatus.REVISION_REQUIRED) {
        throw new ApiError(
          422,
          "422_INVALID_STATUS_TRANSITION",
          "Student can delete application evidence only in REVISION_REQUIRED status",
        );
      }
    }

    if (file.ownerType === "RECORD") {
      const record = await prisma.studentActivityRecord.findUnique({ where: { id: file.ownerId } });
      if (!record || (record.status !== "DRAFT" && record.status !== "REVISION_REQUIRED")) {
        throw new ApiError(
          422,
          "422_INVALID_STATUS_TRANSITION",
          "Student can delete record evidence only in DRAFT/REVISION_REQUIRED",
        );
      }
    }
  }

  await removeObject(file.objectKey);
  await prisma.evidenceFile.delete({ where: { id: fileId } });

  return { success: true };
}
