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


        console.log("Data atual ajustada:", currentDate);

        const upcomingConsultation = await prismaClient.consultation.findMany({
            where: {
                cpf_psychologist: cpf_psychologist,
            },
        }).then((consultations) => {
            for (const consultation of consultations) {
                const consultationDate = new Date(consultation.data_consultation);
                console.log("consultationDate:", consultation.data_consultation);
                const timeDifference = (consultationDate.getTime() - currentDate.getTime()) / (1000 * 60); // Difference in minutes
                console.log("timeDifference:", timeDifference);
        
                if (timeDifference > 0 && timeDifference <= 20) {
                    console.log("Upcoming consultation found:", consultation);
                    return {
                        isUpcoming: true,
                        link_meets: consultation.link_meets || null,
                    };
                }
            }
            console.log("No upcoming consultation found.");
            return {
                isUpcoming: false,
                link_meets: null,
            };
        });

        return {
            unassignedConsultations,
            upcomingConsultation,
        };
    }
}

export { DashboardPsychologistService };