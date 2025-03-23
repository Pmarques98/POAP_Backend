import { Request, Response } from "express";
import { CreateConsultationService } from '../../services/consultation/CreateConsultationService';

class CreateConsultationController {
    async handle(req: Request, res: Response) {
        const { description, cpf_user, cpf_paciente, data_consultation  } = req.body;

        const createConsultationService = new CreateConsultationService();
        const consultation = await createConsultationService.execute({
            description,
            cpf_user,
            cpf_paciente,
            data_consultation
        });

        return res.json(consultation);
    }
}

export { CreateConsultationController };