import { Request, Response } from "express";
import { UpdateNotificationViewedService } from "../../services/notifications/UpdateNotificationViewedService";

class UpdateNotificationViewedController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const service = new UpdateNotificationViewedService();
    try {
      const notification = await service.execute(Number(id));
      return res.json(notification);
    } catch (error) {
      return res.status(404).json({ error: "Notificação nao encontrada" });
    }
  }
}

export { UpdateNotificationViewedController };