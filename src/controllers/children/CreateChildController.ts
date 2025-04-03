import { Request, Response } from "express";
import { CreateChildService } from "../../services/children/CreateChildService";

class CreateChildController {
    async handle(req: Request, res: Response) {
        const { cpf_crianca, cpf_responsavel, telefone_responsavel, nome_crianca } = req.body;

        const createChildService = new CreateChildService();
        const child = await createChildService.execute({
            cpf_crianca,
            cpf_responsavel,
            telefone_responsavel,
            nome_crianca
        });

        return res.json(child);
    }
}

export { CreateChildController };