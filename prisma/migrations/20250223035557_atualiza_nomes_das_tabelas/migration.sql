/*
  Warnings:

  - You are about to drop the `consultas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `psicologos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recomendacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gravity" AS ENUM ('leve', 'moderado', 'grave', 'emergencial');

-- DropTable
DROP TABLE "consultas";

-- DropTable
DROP TABLE "psicologos";

-- DropTable
DROP TABLE "recomendacoes";

-- DropTable
DROP TABLE "usuarios";

-- DropEnum
DROP TYPE "Gravidade";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "gravity" "Gravity" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychologist" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cellphone_number" VARCHAR(15) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "psychologist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "psychologist_email" VARCHAR(100) NOT NULL,
    "data_consultation" TIMESTAMP(3) NOT NULL,
    "report" VARCHAR(3000) NOT NULL,
    "gravity" "Gravity" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "psychologist_email" VARCHAR(100) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "report" VARCHAR(3000) NOT NULL,
    "gravity" "Gravity" NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);
