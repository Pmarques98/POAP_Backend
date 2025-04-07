import prismaClient from "../../prisma";

class DashboardUserService {
    async execute(cpf: string) {
        if (!cpf) {
            throw new Error("O CPF é obrigatório.");
        }

        // Consultar todas as consultas relacionadas ao CPF do usuário
        const consultations = await prismaClient.consultation.findMany({
            where: { cpf_user: cpf },
        });

        // Consultar todas as crianças relacionadas ao CPF do responsável
        const children = await prismaClient.children.findMany({
            where: { cpf_responsavel: cpf },
        });

        // Consultar todos os relatórios relacionados ao CPF do usuário
        const reports = await prismaClient.report.findMany({
            where: { cpf_user: cpf },
        });

        return {
            consultations,
            children,
            reports,
        };
    }
}

export { DashboardUserService };