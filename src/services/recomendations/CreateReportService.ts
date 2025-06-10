import { PrismaClient, ChildStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface ReportRequest {
  name_child: string;
  cpf_user: string;
  cpf_child: string;
  cpf_psychologist: string;
  nome_psychologist: string;
  cellphone_number: string;
  report: string;
  status: ChildStatus;
}

export class CreateReportService {
  async execute({
    name_child,
    cpf_user,
    cpf_child,
    cpf_psychologist,
    nome_psychologist,
    cellphone_number,
    report,
    status,
  }: ReportRequest) {
    if (
      !name_child ||
      !cpf_user ||
      !cpf_child ||
      !cpf_psychologist ||
      !nome_psychologist ||
      !cellphone_number ||
      !report ||
      !status
    ) {
      throw new Error("Campos Obrigatórios não preenchidos");
    }

    // Verifica se os CPFs possuem 11 dígitos
    if (cpf_user.length !== 11 || cpf_psychologist.length !== 11 || cpf_child.length !== 11) {
      throw new Error("CPF precisa ter 11 dígitos");
    }

    // Verificar se a criança está cadastrada
    const childExists = await prisma.children.findFirst({
            where: {
                cpf_child: cpf_child
            }
        });

        if (!childExists) {
            throw new Error("Criança não cadastrada");
        }

    // Verificar se a criança está cadastrada
    const userExists = await prisma.user.findFirst({
            where: {
                cpf: cpf_user
            }
        });

        if (!userExists) {
            throw new Error("Usuário não cadastrado");
        }

    // Verifica se o número de celular possui 11 dígitos
    if (cellphone_number.length !== 11) {
      throw new Error("Número de celular precisa ter 11 dígitos");
    }

    const now = new Date();

    // Cria o relatório
    const newReport = await prisma.report.create({
      data: {
        name_child,
        cpf_user,
        cpf_child,
        cpf_psychologist,
        nome_psychologist,
        cellphone_number,
        report,
        data: now,
      },
    });

    // Atualiza o status da criança pelo CPF
    await prisma.children.updateMany({
      where: { cpf_child: cpf_child },
      data: { status: status },
    });

    return newReport;
  }
}