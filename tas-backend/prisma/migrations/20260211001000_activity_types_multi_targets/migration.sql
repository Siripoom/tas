-- CreateTable
CREATE TABLE "ActivityType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityType_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN "activityTypeId" TEXT;

-- CreateTable
CREATE TABLE "ActivityTargetDepartment" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityTargetDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityTargetMajor" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "majorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityTargetMajor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType_code_key" ON "ActivityType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType_name_key" ON "ActivityType"("name");

-- CreateIndex
CREATE INDEX "Activity_activityTypeId_idx" ON "Activity"("activityTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityTargetDepartment_activityId_departmentId_key" ON "ActivityTargetDepartment"("activityId", "departmentId");

-- CreateIndex
CREATE INDEX "ActivityTargetDepartment_departmentId_idx" ON "ActivityTargetDepartment"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityTargetMajor_activityId_majorId_key" ON "ActivityTargetMajor"("activityId", "majorId");

-- CreateIndex
CREATE INDEX "ActivityTargetMajor_majorId_idx" ON "ActivityTargetMajor"("majorId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTargetDepartment" ADD CONSTRAINT "ActivityTargetDepartment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTargetDepartment" ADD CONSTRAINT "ActivityTargetDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTargetMajor" ADD CONSTRAINT "ActivityTargetMajor_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTargetMajor" ADD CONSTRAINT "ActivityTargetMajor_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Migrate legacy ownerDepartmentId to target departments for compatibility
INSERT INTO "ActivityTargetDepartment" ("id", "activityId", "departmentId", "createdAt")
SELECT a."id" || '_' || a."ownerDepartmentId", a."id", a."ownerDepartmentId", CURRENT_TIMESTAMP
FROM "Activity" a
WHERE a."ownerDepartmentId" IS NOT NULL
ON CONFLICT ("activityId", "departmentId") DO NOTHING;
