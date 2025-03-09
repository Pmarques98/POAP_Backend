import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    gravity: 'leve' | 'moderado' | 'grave' | 'emergencial';
}

class CreateUserService {
    async execute({ name, email, password, gravity }: UserRequest) {
         // Verificar se todos os campos obrigatórios foram enviados
         if (!name || !email || !password || !gravity) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorreto");
        }

        // Verificar se esse email já está cadastrado na plataforma
        const userAlreadyExistInPsychologists = await prismaClient.psychologist.findFirst({
            where: {
                email: email
            }
        });

        const userAlreadyExistInUser = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExistInPsychologists || userAlreadyExistInUser) {
            throw new Error("Usuario já está cadastrado");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                gravity: gravity
            },
            select: {
                id: true,
                name: true,
                email: true,
                gravity: true
            }
        });

        return user;
    }
}

export { CreateUserService };