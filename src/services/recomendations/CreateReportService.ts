import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ReportRequest {
  name_child: string;
  cpf_user: string;
  cpf_child: string;
  cpf_psychologist: string;
  nome_psychologist: string;
  cellphone_number: string;
  report: string;
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
  }: ReportRequest) {
    if (
      !name_child ||
      !cpf_user ||
      !cpf_child ||
      !cpf_psychologist ||
      !nome_psychologist ||
      !cellphone_number ||
      !report
    ) {
      throw new Error("Campos Obrigatórios não preenchidos");
    }

    // Verifica se os CPFs possuem 11 dígitos
    if (cpf_user.length !== 11 || cpf_psychologist.length !== 11 || cpf_child.length !== 11) {
      throw new Error("CPF precisa ter 11 dígitos");
    }

    // Verifica se o número de celular possui 11 dígitos
    if (cellphone_number.length !== 11) {
      throw new Error("Número de celular precisa ter 11 dígitos");
    }

    const now = new Date();
    now.setHours(now.getHours() - 3);

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

    return newReport;
  }
}