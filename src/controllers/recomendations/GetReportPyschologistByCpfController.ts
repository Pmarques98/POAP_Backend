import { Request, Response } from "express";
import { GetReportPyschologistService } from "../../services/recomendations/GetReportPyschologistService";  

class GetReportPyschologistByCpfController {
  async handle(req: Request, res: Response) {
    const { cpf_psychologist } = req.body;
    const service = new GetReportPyschologistService();
    const reports = await service.execute(cpf_psychologist);
    return res.json(reports);
  }
}

export { GetReportPyschologistByCpfController };