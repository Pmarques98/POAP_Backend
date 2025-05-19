import prismaClient from "../../prisma";

class UpdateNotificationViewedService {
  async execute(id: number) {
    // Primeiro, procura pela notificação
      console.log("ID recebido:", id);

    const notification = await prismaClient.notification.findUnique({
      where: { id: id },
    });

    if (!notification) {
      throw new Error("Notificação não encontrada");
    }

    // Depois, atualiza o campo viewed para true
    await prismaClient.notification.update({
      where: { id: Number(id) },
      data: { viewed: true }
    });

    return { message: "Visualização registrada com sucesso!" };
  }
}

export { UpdateNotificationViewedService };