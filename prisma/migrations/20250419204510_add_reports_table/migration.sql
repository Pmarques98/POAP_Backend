/*
  Warnings:

  - You are about to drop the column `nome_user` on the `report` table. All the data in the column will be lost.
  - Added the required column `name_child` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report" DROP COLUMN "nome_user",
ADD COLUMN     "name_child" VARCHAR(100) NOT NULL;
