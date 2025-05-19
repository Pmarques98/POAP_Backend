/*
  Warnings:

  - Added the required column `cpf_child` to the `children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "children" ADD COLUMN     "cpf_child" VARCHAR(11) NOT NULL;
