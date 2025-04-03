/*
  Warnings:

  - You are about to drop the column `report` on the `consultation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "consultation" DROP COLUMN "report";

-- CreateTable
CREATE TABLE "children" (
    "id" SERIAL NOT NULL,
    "cpf_crianca" VARCHAR(11) NOT NULL,
    "cpf_responsavel" VARCHAR(11) NOT NULL,
    "telefone_responsavel" VARCHAR(11) NOT NULL,
    "nome_crianca" VARCHAR(100) NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);
