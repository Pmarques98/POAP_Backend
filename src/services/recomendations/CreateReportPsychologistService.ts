import prismaClient from "../../prisma";

interface ReportPyschologistRequest {
    report: string;
    cpf_psychologist: string;
    name_child: string;
    cpf_child: string;
}

class CreateReportPyschologistService {
    async execute({ report, cpf_psychologist, name_child, cpf_child }: ReportPyschologistRequest) {
        if (!report || !cpf_psychologist || !name_child || !cpf_child) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const newReport = await prismaClient.reportPyschologist.create({
            data: {
                data: new Date(),
                report,
                cpf_psychologist,
                name_child,
                cpf_child,
            },
        });

        return newReport;
    }
}

export { CreateReportPyschologistService };