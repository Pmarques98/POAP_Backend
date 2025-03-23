import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    cpf: string;
    password: string;
}

class AuthUserService {
    private loggedInEmail: string | null = null;

    async execute({ cpf, password }: AuthRequest) {
        // Verificar se o CPF existe na tabela de usuários
        let isUser: boolean = true;
        let psychologist: any;

        let user = await prismaClient.user.findFirst({
            where: {
                cpf: cpf
            }
        });

        // Se não encontrar na tabela de usuários, verificar na tabela de psicólogos
        if (!user) {
            isUser = false;
            psychologist = await prismaClient.psychologist.findFirst({
                where: {
                    cpf: cpf
                }
            });

            // Se não encontrar em nenhuma das tabelas, lançar erro
            if (!user && !psychologist) {
                throw new Error("Usuario/Senha incorretos");
            } else {
                // Verificar se a senha que mandou está correta
                const passwordHash = await compare(password, psychologist.password);
                if (!passwordHash) {
                    throw new Error("Usuario/Senha incorretos");
                }
                // Salvar o email do psicólogo logado
                this.loggedInEmail = psychologist.email;
            }
        } else {
            // Verificar se a senha que mandou está correta
            const passwordHash = await compare(password, user.password);
            if (!passwordHash) {
                throw new Error("Usuario/Senha incorretos");
            }
            // Salvar o email do usuário logado
            this.loggedInEmail = user.email;
        }

        // Se o login for correto, gera o token do usuário
        if (isUser) {
            const token = sign(
                {
                    cpf: user.cpf,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id.toString(),
                    expiresIn: '30d'
                }
            );

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                token: token,
                isUser: true
            };
        } else {
            const token = sign(
                {
                    cpf: psychologist.cpf,
                    email: psychologist.email,
                },
                process.env.JWT_SECRET,
                {
                    subject: psychologist.id.toString(),
                    expiresIn: '30d'
                }
            );

            return {
                id: psychologist.id,
                name: psychologist.name,
                email: psychologist.email,
                cpf: psychologist.cpf,
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