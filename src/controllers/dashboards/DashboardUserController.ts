import { Request, Response } from "express";
import { DashboardUserService } from "../../services/dashboards/DashboardUserService";

class DashboardUserController {
    async handle(req: Request, res: Response) {
        const { cpf } = req.body; // Certifique-se de que o CPF está sendo extraído do corpo da requisição

        if (!cpf) {
            return res.status(400).json({ error: "O CPF é obrigatório." });
        }

        const dashboardUserService = new DashboardUserService();

        try {
            const dashboardData = await dashboardUserService.execute(cpf);
            return res.json(dashboardData);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { DashboardUserController };