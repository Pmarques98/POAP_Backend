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

        // 1. Buscar todas as consultas do psicólogo
        const consultations = await prismaClient.consultation.findMany({
            where: {
                cpf_psychologist: cpf_psychologist,
            },
            select: {
                cpf_paciente: true,
            },
        });

        // 2. Extrair e remover duplicatas dos CPFs dos pacientes
        const cpfPacientes = [
            ...new Set(consultations.map((c) => c.cpf_paciente).filter(Boolean))
        ];

        // 3. Buscar as crianças usando os CPFs dos pacientes
        const children = await prismaClient.children.findMany({
            where: {
                cpf_child: {
                    in: cpfPacientes,
                },
            },
        });

        // ...código existente para upcomingConsultation...

        const upcomingConsultation = await prismaClient.consultation.findMany({
            where: {
                cpf_psychologist: cpf_psychologist,
            },
        }).then((consultations) => {
            for (const consultation of consultations) {
                const consultationDate = new Date(consultation.data_consultation);
                const timeDifference = (consultationDate.getTime() - currentDate.getTime()) / (1000 * 60); // Difference in minutes
                if (timeDifference > 0 && timeDifference <= 20) {
                    return {
                        isUpcoming: true,
                        link_meets: consultation.link_meets || null,
                    };
                }
            }
            return {
                isUpcoming: false,
                link_meets: null,
            };
        });

        return {
            unassignedConsultations,
            upcomingConsultation,
            children,
        };
    }
}

export { DashboardPsychologistService };