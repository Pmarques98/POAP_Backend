import e, { Request, Response } from "express";
import { GetAcceptedConsultationsService } from "../../services/consultation/GetAcceptedConsultationsService";

class CreateConsultationAceptedController {
    async handle(req: Request, res: Response) {
        const { cpf_psychologist } = req.body;

        const createConsultationService = new GetAcceptedConsultationsService();
        const consultation = await createConsultationService.execute(cpf_psychologist);

        return res.json(consultation);
    }
}

export { CreateConsultationAceptedController };
