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

        // Consultar todos os relatórios relacionados ao CPF do usuário
        const reports = await prismaClient.report.findMany({
            where: { cpf_user: cpf_user },
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
                //console.log("consultationDate:", consultationDate);
                //console.log("currentDate:", currentDate);

                const timeDifference = (consultationDate.getTime() - currentDate.getTime()) / (1000 * 60); // Diferença em minutos
        
                return timeDifference > 0 && timeDifference <= 10; // Consulta dentro do intervalo de 10 minutos
            });
        
            if (upcoming) {
                console.log("Consulta próxima encontrada:", upcoming);
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
            reports,
            upcomingConsultation,
        };
    }
}

export { DashboardUserService };