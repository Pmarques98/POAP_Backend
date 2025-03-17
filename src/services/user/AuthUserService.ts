import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    private loggedInEmail: string | null = null;

    async execute({ email, password }: AuthRequest) {
        // Verificar se o email existe na tabela de usuários
        let isUser: boolean = true;
        let psychologist: any;

        let user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        // Se não encontrar na tabela de usuários, verificar na tabela de psicólogos
        if (!user) {
            isUser = false;
            psychologist = await prismaClient.psychologist.findFirst({
                where: {
                    email: email
                }
            });

            // Se não encontrar em nenhuma das tabelas, lançar erro
            if (!user && !psychologist) {
                throw new Error("Usuario/Senha incorretos");
            }
            else{
                // Verificar se a senha que mandou está correta
                const passwordHash = await compare(password, psychologist.password);
                if (!passwordHash) {
                    throw new Error("Usuario/Senha incorretos");
                }
            }
        }
        else{
            // Verificar se a senha que mandou está correta
            const passwordHash = await compare(password, user.password);
            if (!passwordHash) {
                throw new Error("Usuario/Senha incorretos");
            }
        }

        // Se o login for correto, salva o email e gera o token do usuário
        this.loggedInEmail = email;

        if(isUser){
            const token = sign(
                {
                    name: user.name,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: '30d'
                }
            );

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
                isUser: true
            };
        }
        else{
            const token = sign(
                {
                    name: psychologist.name,
                    email: psychologist.email,
                },
                process.env.JWT_SECRET,
                {
                    subject: psychologist.id,
                    expiresIn: '30d'
                }
            );

            return {
                id: psychologist.id,
                name: psychologist.name,
                email: psychologist.email,
                cellphone_number: psychologist.cellphone_number,
                status: psychologist.status,
                token: token,
                isUser: false
            };
        }
    }

    getLoggedInEmail(): string | null {
        return this.loggedInEmail;
    }
}

export { AuthUserService };