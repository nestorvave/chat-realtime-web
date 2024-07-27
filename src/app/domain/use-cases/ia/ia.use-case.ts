import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export function IACase() {
  const suggestionMsgResponse = async (
    lastMessages: string,
    message: string,
  ) => {
    console.log("loading....");
    const prompt = `Mi aplicacion es un chat tipo whatsapp, messenger, lo que quiero es que me des sugerencias de respuestas
     a los mensajes que me vayan enviando,las sugerencias deben ser muy cortas, a los mensajes que 
     le daras sugerencias de respuesta sera a este ultimo mensaje "${message}" y el contexto de la conversacion es esto que son
     los ultimos mensajes del chat  "${lastMessages}"
      ...El modo en el que me daras las respuestas sera en un texto seguido separados con un slash (/) cada sugerencia no tienen que ser afuerzas preguntas las sugerencias
      pueden ser de todo tipo hasta una respuesta monosilabica, un texto, o una pregunta etc... solo quiero 4 sugerencias en total, sin caracteres especiales los unicos permitidos son
      signos de intrrogacion o exclamacion
    `;

    const { text } = await generateText({
      model: google("models/gemini-pro"),
      prompt,
    });
    return text;
  };
  const suggestionUser = async (email: string, suggestions?: string[]) => {
    console.log("loading users....");
    const prompt = `tengo una pantalla de login donde vienen los campos email y username, lo que quiero dado a un email me sugieras username que el usuario 
	puede gustarle para nombre de username, el email que ingreso el usuario es: ${email}" el usuario debe ser supercorto ya que lo debe recordar para toda la vida
	quiero que me devuelvas 4 recomendaciones incluso dividas entre un slash (/), dividir la respuesta con el slash es muy importante
	 NO ME DEVUELVAS LAS MISMAS SUGERENCIAS SI ES QUE TE MOSTRE EJEMPLOS 
    `;
    const getNewSuggestion = `NECESITO diferentes sugerencias de usuario a estas  ${suggestions?.map((s) => s).join(",")} OJO NO ME PUEDES DEVOLVER LAS MISMAS SUGERENCIAS si
	ya no sabes que sugerencias darme intenta sugenrencias en otro idioma diferente al email dado
	 si me devuelves las mismas es un mal resultado ya que el usuario
	busca algo diferente el contexto de mi aplicacion es que`;
    const { text } = await generateText({
      model: google("models/gemini-pro"),
      prompt: suggestions?.length !== 0 ? getNewSuggestion + prompt : prompt,
    });
    return text;
  };

  return { suggestionMsgResponse, suggestionUser };
}
