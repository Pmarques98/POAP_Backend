import prismaClient from '../../prisma';

interface ConsultationRequest {
    description: string;
    user_email: string;
    data_consultation: string;
}

class CreateConsultationService {
    async execute({ description, user_email, data_consultation }: ConsultationRequest) {
        // Verificar se todos os campos obrigatórios foram enviados
        if (!description || !user_email || !data_consultation) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Obter o campo gravity da tabela User com base no email
        const user = await prismaClient.user.findFirst({
            where: {
                email: user_email
            },
            select: {
                gravity: true
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        // Criar a consulta no banco de dados
        const consultation = await prismaClient.consultation.create({
            data: {
                description,
                user_email,
                data_consultation: new Date(data_consultation),
                gravity: user.gravity                
            }
        });

        return consultation;
    }
}

export { CreateConsultationService };