import prismaClient from "../../prisma";

interface ChildRequest {
    cpf_crianca: string;
    cpf_responsavel: string;
    telefone_responsavel: string;
    nome_crianca: string;
}

class CreateChildService {
    async execute({ cpf_crianca, cpf_responsavel, telefone_responsavel, nome_crianca }: ChildRequest) {
        // Verificar se todos os campos obrigatórios foram enviados
        if (!cpf_crianca || !cpf_responsavel || !telefone_responsavel || !nome_crianca) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        // Verificar se já existe uma criança cadastrada com o mesmo CPF
        const existingChild = await prismaClient.children.findFirst({
            where: { cpf_crianca },
        });

        if (existingChild) {
            throw new Error("Já existe uma criança cadastrada com este CPF.");
        }

        // Criar o registro da criança no banco de dados
        const child = await prismaClient.children.create({
            data: {
                cpf_crianca,
                cpf_responsavel,
                telefone_responsavel,
                nome_crianca,
            },
        });

        return child;
    }
}

export { CreateChildService };