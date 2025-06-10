import prismaClient from "../../prisma";

interface ChildRequest {
    cpf_child: string;
    cpf_user: string;
    cellphone_user: string;
    name_child: string;
}

class CreateChildService {
    async execute({ cpf_child, cpf_user, cellphone_user, name_child }: ChildRequest) {
        // Verificar se todos os campos obrigatórios foram enviados
        if (!cpf_child || !cpf_user || !cellphone_user || !name_child) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        // Verificar se já existe uma criança cadastrada com o mesmo CPF
        const existingChild = await prismaClient.children.findFirst({
            where: { cpf_child },
        });

        // Verificar se o CPF possui exatamente 11 dígitos
        if (cpf_child.length !== 11) {
            throw new Error("CPF deve conter exatamente 11 dígitos");
        }

        if (existingChild) {
            throw new Error("Já existe uma criança cadastrada com este CPF.");
        }

        // Verificar se o usuario responsável está cadastrado
        const userExists = await prismaClient.user.findFirst({
            where: {
                cpf: cpf_user
            }
        });

        if (!userExists) {
            throw new Error("Usuário não cadastrado");
        }

        // Criar o registro da criança no banco de dados
        const child = await prismaClient.children.create({
            data: {
                cpf_child,
                cpf_user,
                cellphone_user,
                name_child,
            },
        });

        return child;
    }
}

export { CreateChildService };