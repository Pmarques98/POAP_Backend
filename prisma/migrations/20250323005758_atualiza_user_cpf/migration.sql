/*
  Warnings:

  - You are about to drop the column `gravity` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `gravity` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `gravity` on the `users` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `psychologist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consultation" DROP COLUMN "gravity";

-- AlterTable
ALTER TABLE "psychologist" ADD COLUMN     "cpf" VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "gravity";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "gravity",
ADD COLUMN     "cpf" VARCHAR(11) NOT NULL;

-- DropEnum
DROP TYPE "Gravity";
