import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    cellphone_number: string;
    status: 'disponivel';
}

class CreateUserServicePsychologist {
    async execute({ name, email, password, cellphone_number }: UserRequest) {
        // Verificar se todos os campos obrigatórios foram enviados
        if (!name || !email || !password || !cellphone_number) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorreto");
        }

        // Verificar se o número de celular está no formato correto
        const cellphoneRegex = /^[1-9]{2}[9][0-9]{8}$/;
        if (!cellphoneRegex.test(cellphone_number)) {
            throw new Error("Número de celular incorreto. Deve estar no formato DD9XXXXXXXX");
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

        try {
            const user = await prismaClient.psychologist.create({
                data: {
                    name: name,
                    email: email,
                    status: 'disponivel',
                    password: passwordHash,
                    cellphone_number: cellphone_number
                },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    email: true,
                    cellphone_number: true
                }
            });

            return user;
        } catch (error) {
            throw new Error("Erro ao criar usuário");
        }
    }
}

export { CreateUserServicePsychologist };