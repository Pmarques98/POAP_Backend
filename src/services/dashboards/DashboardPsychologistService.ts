import prismaClient from "../../prisma";

class DashboardPsychologistService {
    async execute(cpf_psychologist: string) {
        if (!cpf_psychologist) {
            throw new Error("O CPF do psicólogo é obrigatório.");
        }

        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3); // Ajustar para o fuso horário correto

        // Consultas que não têm o campo "cpf_psychologist" preenchido
        const unassignedConsultations = await prismaClient.consultation.findMany({
            where: {
                cpf_psychologist: null,
            },
        });

        // Consultas atribuídas ao psicólogo
        const assignedConsultations = await prismaClient.consultation.findMany({
            where: {
                cpf_psychologist: cpf_psychologist,
            },
        });

        console.log("Data atual ajustada:", currentDate);

        const upcomingConsultation = await prismaClient.consultation.findFirst({
            where: {
                cpf_psychologist: cpf_psychologist,
            },
        }).then((consultation) => {
            if (consultation) {
                const consultationDate = new Date(consultation.data_consultation);
                console.log("consultationDate:", consultation.data_consultation);
                const timeDifference = (consultationDate.getTime() - currentDate.getTime()) / (1000 * 60); // Diferença em minutos
                console.log("timeDifference:", timeDifference);

                if (timeDifference > 0 && timeDifference <= 15) {
                    console.log("Consulta próxima encontrada:", consultation);
                    return {
                        isUpcoming: true,
                        link_meets: consultation.link_meets || null,
                    };
                }
            }
            console.log("Nenhuma consulta próxima encontrada.");
            return {
                isUpcoming: false,
                link_meets: null,
            };
        });

        return {
            unassignedConsultations,
            assignedConsultations,
            upcomingConsultation,
        };
    }
}

export { DashboardPsychologistService };