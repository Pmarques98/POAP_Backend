import { Request, Response } from "express";
import { DashboardUserService } from "../../services/dashboards/DashboardUserService";

class DashboardUserController {
    async handle(req: Request, res: Response) {
        const { cpf_user } = req.body;


        const dashboardUserService = new DashboardUserService();

        try {
            const dashboardData = await dashboardUserService.execute(cpf_user);
            return res.json(dashboardData);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { DashboardUserController };