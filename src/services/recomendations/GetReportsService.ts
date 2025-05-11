import prismaClient from '../../prisma';

class GetReportsService {
    async execute(cpf_user: string) {
        const assignedReports = await prismaClient.report.findMany({
            where: {
                cpf_user: cpf_user,
            },
        });

        if (!assignedReports || assignedReports.length === 0) {
            throw new Error("Sem recomendacoes dos psicologos para as criancas.");
        }

        return assignedReports;
    }
}

export { GetReportsService };
// O código acima define um serviço que consulta o banco de dados para obter todas as recomendações atribuídas a um usuário específico (cpf_user). Se não houver recomendações, uma exceção é lançada.
