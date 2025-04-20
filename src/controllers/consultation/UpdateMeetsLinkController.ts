import { Request, Response } from "express";
import prisma from "../../prisma"; 

export class UpdateMeetsLinkController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id, link_meets } = req.body;

        if (!id || !link_meets) {
            return res.status(400).json({ error: "ID e link_meets são obrigatórios." });
        }

        try {
            const consultation = await prisma.consultation.update({
                where: { id: Number(id) },
                data: { link_meets },
            });

            return res.json({
                message: "Link do Google Meets atualizado com sucesso.",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar o link do Google Meets." });
        }
    }
}