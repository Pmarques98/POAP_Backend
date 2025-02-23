/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gravidade" AS ENUM ('leve', 'moderado', 'grave', 'emergencial');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('disponivel', 'ocupado');

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "gravidade" "Gravidade" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psicologos" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "psicologos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" BIGSERIAL NOT NULL,
    "descricao" VARCHAR(512) NOT NULL,
    "usuario_email" VARCHAR(100) NOT NULL,
    "psicologo_email" VARCHAR(100) NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "relatorio" VARCHAR(3000) NOT NULL,
    "gravidade" "Gravidade" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recomendacoes" (
    "id" BIGSERIAL NOT NULL,
    "usuario_email" VARCHAR(100) NOT NULL,
    "psicologo_email" VARCHAR(100) NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "recomendacao" VARCHAR(3000) NOT NULL,
    "gravidade" "Gravidade" NOT NULL,

    CONSTRAINT "recomendacoes_pkey" PRIMARY KEY ("id")
);
