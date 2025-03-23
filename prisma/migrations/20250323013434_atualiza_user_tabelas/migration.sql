/*
  Warnings:

  - You are about to drop the column `psychologist_email` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `psychologist_email` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `report` table. All the data in the column will be lost.
  - Added the required column `cpf_paciente` to the `consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_user` to the `consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellphone_number` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_psychologist` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_user` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_psychologist` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_user` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consultation" DROP COLUMN "psychologist_email",
DROP COLUMN "user_email",
ADD COLUMN     "cpf_paciente" VARCHAR(11) NOT NULL,
ADD COLUMN     "cpf_psychologist" VARCHAR(100),
ADD COLUMN     "cpf_user" VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "psychologist_email",
DROP COLUMN "user_email",
ADD COLUMN     "cellphone_number" VARCHAR(15) NOT NULL,
ADD COLUMN     "cpf_psychologist" VARCHAR(11) NOT NULL,
ADD COLUMN     "cpf_user" VARCHAR(11) NOT NULL,
ADD COLUMN     "nome_psychologist" VARCHAR(100) NOT NULL,
ADD COLUMN     "nome_user" VARCHAR(100) NOT NULL;
