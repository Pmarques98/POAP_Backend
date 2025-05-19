/*
  Warnings:

  - You are about to drop the column `cpf_crianca` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `nome_crianca` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_responsavel` on the `children` table. All the data in the column will be lost.
  - Added the required column `cellphone_user` to the `children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_user` to the `children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_child` to the `children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "children" DROP COLUMN "cpf_crianca",
DROP COLUMN "nome_crianca",
DROP COLUMN "telefone_responsavel",
ADD COLUMN     "cellphone_user" VARCHAR(11) NOT NULL,
ADD COLUMN     "cpf_user" VARCHAR(11) NOT NULL,
ADD COLUMN     "name_child" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "report" VARCHAR(3000) NOT NULL,
    "cpf_psychologist" VARCHAR(11) NOT NULL,
    "name_child" VARCHAR(100) NOT NULL,
    "cpf_child" VARCHAR(11) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);
