/*
  Warnings:

  - Added the required column `cpf_child` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report" ADD COLUMN     "cpf_child" VARCHAR(11) NOT NULL;
