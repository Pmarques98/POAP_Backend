import prismaClient from '../../prisma'    


interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name,email,password}: UserRequest){

        //Verificar se ele enviou um email
        if(!email){
            throw new Error ("Email incorreto")
        }

        //Verificar se esse email ja esta cadastrado na plataforma
        const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error("Usuario ja esta cadastrado")
        }

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: password
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export {CreateUserService}