import { beforeEach, describe, expect, it, vi } from "vitest";
import { approveApplication, requestApplicationRevision } from "./approvals.service";
import { prisma } from "../../lib/prisma";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    activityApplication: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    studentActivityRecord: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const actor = {
  id: "reviewer-1",
  role: "SUPER_ADMIN",
} as const;

const buildReviewableApplication = (status: string) => ({
  id: "app-1",
  status,
  activity: {
    ownerScope: "DEPARTMENT",
    ownerFacultyId: "fac-1",
    ownerDepartmentId: "dep-1",
    targetDepartments: [],
    targetMajors: [],
  },
  student: {
    studentProfile: {
      facultyId: "fac-1",
      departmentId: "dep-1",
      majorId: "major-1",
    },
  },
});

describe("approvals.service application transitions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows approving an already APPROVED application (idempotent reconfirm)", async () => {
    vi.mocked(prisma.activityApplication.findUnique).mockResolvedValue(
      buildReviewableApplication("APPROVED") as any,
    );
    vi.mocked(prisma.activityApplication.update).mockResolvedValue({
      id: "app-1",
      status: "APPROVED",
    } as any);

    const result = await approveApplication(actor as any, "app-1", "reconfirm");

    expect(prisma.activityApplication.update).toHaveBeenCalledWith({
      where: { id: "app-1" },
      data: expect.objectContaining({
        status: "APPROVED",
        decidedById: "reviewer-1",
        remark: "reconfirm",
      }),
    });
    expect(result.status).toBe("APPROVED");
  });

  it("allows requesting revision from APPROVED", async () => {
    vi.mocked(prisma.activityApplication.findUnique).mockResolvedValue(
      buildReviewableApplication("APPROVED") as any,
    );
    vi.mocked(prisma.activityApplication.update).mockResolvedValue({
      id: "app-1",
      status: "REVISION_REQUIRED",
    } as any);

    const result = await requestApplicationRevision(actor as any, "app-1", "missing details");

    expect(prisma.activityApplication.update).toHaveBeenCalledWith({
      where: { id: "app-1" },
      data: expect.objectContaining({
        status: "REVISION_REQUIRED",
        decidedById: "reviewer-1",
        remark: "missing details",
      }),
    });
    expect(result.status).toBe("REVISION_REQUIRED");
  });

  it("still rejects approve for invalid statuses", async () => {
    vi.mocked(prisma.activityApplication.findUnique).mockResolvedValue({
      id: "app-1",
      status: "CANCELLED",
    } as any);

    await expect(approveApplication(actor as any, "app-1")).rejects.toMatchObject({
      statusCode: 422,
      code: "422_INVALID_STATUS_TRANSITION",
    });

    expect(prisma.activityApplication.update).not.toHaveBeenCalled();
  });
});
