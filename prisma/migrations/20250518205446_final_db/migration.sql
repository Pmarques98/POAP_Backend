/*
  Warnings:

  - Added the required column `cpf_user` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "cpf_user" VARCHAR(11) NOT NULL;
