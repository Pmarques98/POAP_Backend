import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
}

class CreateUserService {
    async execute({ name, email, password, cpf }: UserRequest) {
         // Verificar se todos os campos obrigatórios foram enviados
         if (!name || !email || !password || !cpf) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorreto");
        }

        // Verificar se o CPF possui exatamente 11 dígitos
        if (cpf.length !== 11) {
            throw new Error("CPF deve conter exatamente 11 dígitos");
        }

        // Verificar se esse cpf já está cadastrado na plataforma
        const userAlreadyExistInPsychologists = await prismaClient.psychologist.findFirst({
            where: {
                cpf: cpf
            }
        });

        const userAlreadyExistInUser = await prismaClient.user.findFirst({
            where: {
                cpf: cpf
            }
        });

        const userAlreadyExistInChildren = await prismaClient.children.findFirst({
            where: {
                cpf_child: cpf
            }
        });

        if (userAlreadyExistInPsychologists || userAlreadyExistInUser || userAlreadyExistInChildren) {
            throw new Error("Usuario já está cadastrado");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                cpf: cpf
            },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true
            }
        });

        return user;
    }
}

export { CreateUserService };