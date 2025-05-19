import { Request, Response } from "express";
import { CreateNotificationService } from "../../services/notifications/CreateNotificationService";

class CreateNotificationController {
    async handle(req: Request, res: Response) {
        const { report, cpf_psychologist, name_child, cpf_child, cpf_user } = req.body;

        const service = new CreateNotificationService();

        try {
            const notification = await service.execute({ report, cpf_psychologist, name_child, cpf_child, cpf_user});
            return res.json(notification);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateNotificationController };