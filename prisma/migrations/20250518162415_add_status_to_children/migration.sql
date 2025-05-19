-- CreateEnum
CREATE TYPE "ChildStatus" AS ENUM ('leve', 'moderado', 'grave', 'critico', 'em_observacao');

-- AlterTable
ALTER TABLE "children" ADD COLUMN     "status" "ChildStatus";
