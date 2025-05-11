import prismaClient from '../../prisma';

class GetAcceptedConsultationsService {
    async execute(cpf_psychologist: string) {
        // Consultas atribuídas ao psicólogo
        const assignedConsultations = await prismaClient.consultation.findMany({
            where: {
                cpf_psychologist: cpf_psychologist,
            },
        });

        if (!assignedConsultations || assignedConsultations.length === 0) {
            throw new Error("Sem consultas aceitas.");
        }

        return assignedConsultations;
    }
}

export { GetAcceptedConsultationsService };
// O código acima define um serviço que consulta o banco de dados para obter todas as consultas atribuídas a um psicólogo específico.