import { Request, Response } from "express";
import prismaClient from "../../prisma";

class AcceptConsultationController {
    async handle(req: Request, res: Response) {
        const { id, cpf_psychologist } = req.body;

        if (!id || !cpf_psychologist) {
            return res.status(400).json({ error: "ID e CPF do psicólogo são obrigatórios." });
        }

        try {
            const consultation = await prismaClient.consultation.update({
                where: { id: Number(id) },
                data: { cpf_psychologist: cpf_psychologist },
            });

            return res.status(200).json({ message: "Consulta aceita com sucesso."});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao aceitar a consulta." });
        }
    }
}

export { AcceptConsultationController };