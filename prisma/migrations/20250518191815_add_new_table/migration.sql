/*
  Warnings:

  - The values [em_observacao] on the enum `ChildStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChildStatus_new" AS ENUM ('leve', 'moderado', 'grave', 'critico');
ALTER TABLE "children" ALTER COLUMN "status" TYPE "ChildStatus_new" USING ("status"::text::"ChildStatus_new");
ALTER TYPE "ChildStatus" RENAME TO "ChildStatus_old";
ALTER TYPE "ChildStatus_new" RENAME TO "ChildStatus";
DROP TYPE "ChildStatus_old";
COMMIT;

-- CreateTable
CREATE TABLE "reportPyschologist" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "report" VARCHAR(3000) NOT NULL,
    "cpf_psychologist" VARCHAR(11) NOT NULL,
    "name_child" VARCHAR(100) NOT NULL,
    "cpf_child" VARCHAR(11) NOT NULL,

    CONSTRAINT "reportPyschologist_pkey" PRIMARY KEY ("id")
);
