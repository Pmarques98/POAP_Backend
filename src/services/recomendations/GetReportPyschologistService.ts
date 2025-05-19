import prismaClient from "../../prisma";

class GetReportPyschologistService {
  async execute(cpf_psychologist: string) {
    const reports = await prismaClient.reportPyschologist.findMany({
      where: { cpf_psychologist }
    });
    return reports;
  }
}

export { GetReportPyschologistService };