import { Request, Response } from "express";
import { CreateChildService } from "../../services/children/CreateChildService";

class CreateChildController {
    async handle(req: Request, res: Response) {
        const { cpf_child, cpf_user, cellphone_user, name_child } = req.body;

        const createChildService = new CreateChildService();
        const child = await createChildService.execute({
            cpf_child,
            cpf_user,
            cellphone_user,
            name_child
        });

        return res.json(child);
    }
}

export { CreateChildController };