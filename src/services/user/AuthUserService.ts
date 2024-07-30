import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email,password}: AuthRequest){
        //Verificar se o email existe no banco de dados
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("Usuario/Senha incorretos")
        }

        //verificar se a senha que mandou esta correta
        const passwordHash = await compare(password, user.password)
        if(!passwordHash){
            throw new Error("Usuario/Senha incorretos")
        }

        //se o login for correto, gera o token do usuario
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
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService};