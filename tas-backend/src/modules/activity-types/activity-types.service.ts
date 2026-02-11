import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";

function handleUniqueError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "409_CONFLICT", "Duplicated activity type code or name");
  }

  throw error;
}

export async function listActivityTypes(query: { search?: string }) {
  return prisma.activityType.findMany({
    where: query.search
      ? {
          OR: [
            {
              code: {
                contains: query.search,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: query.search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,
    orderBy: [{ code: "asc" }],
  });
}

export async function getActivityTypeById(id: string) {
  const data = await prisma.activityType.findUnique({ where: { id } });
  if (!data) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity type not found");
  }
  return data;
}

export async function createActivityType(input: { code: string; name: string }) {
  try {
    return await prisma.activityType.create({
      data: {
        code: input.code,
        name: input.name,
      },
    });
  } catch (error) {
    handleUniqueError(error);
  }
}

export async function updateActivityType(
  id: string,
  input: {
    code?: string;
    name?: string;
  },
) {
  const existing = await prisma.activityType.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity type not found");
  }

  try {
    return await prisma.activityType.update({
      where: { id },
      data: {
        code: input.code,
        name: input.name,
      },
    });
  } catch (error) {
    handleUniqueError(error);
  }
}

export async function deleteActivityType(id: string) {
  const existing = await prisma.activityType.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity type not found");
  }

  const usedCount = await prisma.activity.count({
    where: { activityTypeId: id },
  });

  if (usedCount > 0) {
    throw new ApiError(409, "409_CONFLICT", "Activity type is referenced by activities");
  }

  await prisma.activityType.delete({ where: { id } });
  return { success: true };
}
