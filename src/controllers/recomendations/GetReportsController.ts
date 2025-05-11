import e, { Request, Response } from "express";
import { GetReportsService } from "../../services/recomendations/GetReportsService";

class GetReportsController {
    async handle(req: Request, res: Response) {
        const { cpf_user } = req.body;

        const reportsService = new GetReportsService();
        const reports = await reportsService.execute(cpf_user);

        return res.json(reports);
    }
}

export { GetReportsController };