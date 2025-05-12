import { Request, Response } from "express";
import { CreateReportService } from "../../services/recomendations/CreateReportService";

export class CreateReportController {
  async handle(req: Request, res: Response) {
    const {
      name_child,
      cpf_user,
      cpf_child,
      cpf_psychologist,
      nome_psychologist,
      cellphone_number,
      report,
    } = req.body;

    const createReportService = new CreateReportService();

    try {
      const newReport = await createReportService.execute({
        name_child,
        cpf_user,
        cpf_child,
        cpf_psychologist,
        nome_psychologist,
        cellphone_number,
        report,
      });

      return res.status(201).json(newReport);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}