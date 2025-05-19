import { Request, Response } from "express";
import { CreateReportPyschologistService } from "../../services/recomendations/CreateReportPsychologistService";

class CreateReportPyschologistController {
    async handle(req: Request, res: Response) {
        const { report, cpf_psychologist, name_child, cpf_child } = req.body;

        const service = new CreateReportPyschologistService();

        try {
            const newReport = await service.execute({ report, cpf_psychologist, name_child, cpf_child });
            return res.json(newReport);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateReportPyschologistController };