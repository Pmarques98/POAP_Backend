/*
  Warnings:

  - The primary key for the `consultas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `psicologos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `recomendacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "consultas" DROP CONSTRAINT "consultas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "consultas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "consultas_id_seq";

-- AlterTable
ALTER TABLE "psicologos" DROP CONSTRAINT "psicologos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "psicologos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "psicologos_id_seq";

-- AlterTable
ALTER TABLE "recomendacoes" DROP CONSTRAINT "recomendacoes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "recomendacoes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "recomendacoes_id_seq";

-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuarios_id_seq";
