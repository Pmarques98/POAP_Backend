import prismaClient from "../../prisma";

interface NotificationRequest {
    report: string;
    cpf_psychologist: string;
    name_child: string;
    cpf_child: string;
    cpf_user: string;
}

class CreateNotificationService {
    async execute({ report, cpf_psychologist, name_child, cpf_child, cpf_user }: NotificationRequest) {
        if (!report || !cpf_psychologist || !name_child || !cpf_child || !cpf_user) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const notification = await prismaClient.notification.create({
            data: {
                data: new Date(),
                report,
                cpf_psychologist,
                name_child,
                cpf_child,
                cpf_user
            },
        });

        return notification;
    }
}

export { CreateNotificationService };