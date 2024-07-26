import { IMessage } from "@/app/domain/models/messages/messages.model";

export default async function getLastMessages (messages: IMessage[]): Promise<string> {
  // Ordenar los mensajes por la fecha de creación en orden descendente
  messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return messages.slice(0, 10).map((message)=>message.message).join(',');
}
