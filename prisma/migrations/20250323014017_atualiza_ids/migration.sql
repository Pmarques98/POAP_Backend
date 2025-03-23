/*
  Warnings:

  - The primary key for the `consultation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `consultation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `psychologist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `psychologist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "consultation" DROP CONSTRAINT "consultation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "consultation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "psychologist" DROP CONSTRAINT "psychologist_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "psychologist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "report" DROP CONSTRAINT "report_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "report_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
