import { EvidenceOwnerType, RecordStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";

function assertRecordEditable(status: RecordStatus, lockedWhenApproved: boolean) {
  if (lockedWhenApproved || (status !== "DRAFT" && status !== "REVISION_REQUIRED")) {
    throw new ApiError(
      422,
      "422_INVALID_STATUS_TRANSITION",
      "Record is not editable/deletable in current status",
    );
  }
}

async function validateEvidenceRule(recordId: string) {
  const files = await prisma.evidenceFile.findMany({
    where: {
      ownerType: EvidenceOwnerType.RECORD,
      ownerId: recordId,
    },
  });

  if (files.length === 0) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "At least one evidence file is required");
  }

  const pdfCount = files.filter((file) => file.fileType === "PDF").length;

  if (pdfCount !== files.length) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Only PDF evidence is allowed");
  }

  if (pdfCount > 1) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Only one PDF evidence file is allowed");
  }
}

export async function listMyRecords(studentUserId: string) {
  const records = await prisma.studentActivityRecord.findMany({
    where: { studentUserId },
    orderBy: { createdAt: "desc" },
  });

  const ids = records.map((record) => record.id);

  const files = ids.length
    ? await prisma.evidenceFile.findMany({
        where: {
          ownerType: "RECORD",
          ownerId: { in: ids },
        },
      })
    : [];

  const filesByOwner = files.reduce<Record<string, typeof files>>((acc, file) => {
    acc[file.ownerId] = acc[file.ownerId] || [];
    acc[file.ownerId].push(file);
    return acc;
  }, {});

  return records.map((record) => ({
    ...record,
    evidenceFiles: filesByOwner[record.id] || [],
  }));
}

export async function createMyRecord(
  studentUserId: string,
  input: {
    title: string;
    joinStart: string;
    joinEnd: string;
    location: string;
    hours: number;
    note?: string;
  },
) {
  const joinStart = new Date(input.joinStart);
  const joinEnd = new Date(input.joinEnd);

  if (joinStart >= joinEnd) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "joinStart must be before joinEnd");
  }

  return prisma.studentActivityRecord.create({
    data: {
      studentUserId,
      title: input.title,
      joinStart,
      joinEnd,
      location: input.location,
      hours: input.hours,
      note: input.note,
      status: "DRAFT",
    },
  });
}

export async function updateMyRecord(
  studentUserId: string,
  recordId: string,
  input: Partial<{
    title: string;
    joinStart: string;
    joinEnd: string;
    location: string;
    hours: number;
    note: string;
  }>,
) {
  const existing = await prisma.studentActivityRecord.findFirst({
    where: {
      id: recordId,
      studentUserId,
    },
  });

  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "Record not found");
  }

  assertRecordEditable(existing.status, existing.lockedWhenApproved);

  if (input.joinStart || input.joinEnd) {
    const joinStart = new Date(input.joinStart || existing.joinStart);
    const joinEnd = new Date(input.joinEnd || existing.joinEnd);

    if (joinStart >= joinEnd) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "joinStart must be before joinEnd");
    }
  }

  return prisma.studentActivityRecord.update({
    where: { id: recordId },
    data: {
      title: input.title,
      joinStart: input.joinStart ? new Date(input.joinStart) : undefined,
      joinEnd: input.joinEnd ? new Date(input.joinEnd) : undefined,
      location: input.location,
      hours: input.hours,
      note: input.note,
    },
  });
}

export async function deleteMyRecord(studentUserId: string, recordId: string) {
  const existing = await prisma.studentActivityRecord.findFirst({
    where: {
      id: recordId,
      studentUserId,
    },
  });

  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "Record not found");
  }

  assertRecordEditable(existing.status, existing.lockedWhenApproved);

  await prisma.studentActivityRecord.delete({
    where: { id: recordId },
  });

  return { success: true };
}

export async function submitMyRecord(studentUserId: string, recordId: string) {
  const existing = await prisma.studentActivityRecord.findFirst({
    where: {
      id: recordId,
      studentUserId,
    },
  });

  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "Record not found");
  }

  if (existing.status !== "DRAFT" && existing.status !== "REVISION_REQUIRED") {
    throw new ApiError(422, "422_INVALID_STATUS_TRANSITION", "Only DRAFT/REVISION_REQUIRED can be submitted");
  }

  await validateEvidenceRule(recordId);

  return prisma.studentActivityRecord.update({
    where: { id: recordId },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
    },
  });
}
