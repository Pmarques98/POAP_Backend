import prismaClient from "../../prisma";

class DashboardUserService {
    async execute(cpf_user: string) {
    

        // Consultar todas as consultas relacionadas ao CPF do usuário
        const consultations = await prismaClient.consultation.findMany({
            where: { cpf_user: cpf_user },
        });

        // Consultar todas as crianças relacionadas ao CPF do responsável
        const children = await prismaClient.children.findMany({
            where: { cpf_responsavel: cpf_user },
        });


        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3); 

        const upcomingConsultation = await prismaClient.consultation.findMany({
            where: {
                cpf_user: cpf_user,
                cpf_psychologist: {
                    not: null, // Garante que o cpf_psychologist está preenchido
                },
            },
        }).then((consultations) => {
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() - 3); // Ajusta o horário atual para UTC-3
        
            const upcoming = consultations.find((consultation) => {
                const consultationDate = new Date(consultation.data_consultation);
                console.log("consultationDate:", consultationDate);
                console.log("currentDate:", currentDate);

                const timeDifference = (consultationDate.getTime() - currentDate.getTime()) / (1000 * 60); // Diferença em minutos
                console.log("timeDifference:", timeDifference);

                return timeDifference > 0 && timeDifference <= 10; // Consulta dentro do intervalo de 10 minutos
            });
        
            if (upcoming) {
                console.log("Consulta próxima encontrada:", upcoming);
        
                // Verifica se o link_meets nao foi alterado pelo psicologo
                if (upcoming.link_meets === "https://meet.google.com/new") {
                    return {
                        isUpcoming: false,
                        link_meets: null,
                    };
                }
        
                return {
                    isUpcoming: true,
                    link_meets: upcoming.link_meets || null,
                };
            }
        
            console.log("Nenhuma consulta próxima encontrada.");
            return {
                isUpcoming: false,
                link_meets: null,
            };
        });

        return {
            consultations,
            children,
            upcomingConsultation,
        };
    }
}

export { DashboardUserService };