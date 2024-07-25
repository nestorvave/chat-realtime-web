import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export async function createSuggestions(message: string) {
  const prompt = `Mi aplicacion es un chat tipo whatsapp, messenger, lo que quiero es que me des sugerencias de respuestas
   a los mensajes que me vayan enviando,las sugerencias deben ser muy cortas, al mensaje que le daras sugerencias de respuesta sera el siguiente  "${message}"
    ...El modo en el que me daras las respuestas sera en un texto seguido separados con un slash cada pregunta solo quiero 4 sugerencias en total
     sin caracteres especiales mas que los signos de interrogacion
  
  `;

  /*  `Mi aplicacion es una app, lo que quiero es que el usuario con el que estoy conversando tiene gustos como futbol, politica de mexico, lo que quiero es que me des 
    sugerencias de platicas que puedo hacer con el pero las preguntas deben ser hechas como una platica casual, de amigos, no quiero que se sienta como una entrevista es decir
    evita el ¿Por que? y cosas parecidas que haga parecer como una entrevista o un cuestionario
    usuario quiero que me la devuelvas en forma de preguntas, 
    devuelvemelo como un texto plano separado cada pregunta por un / y las preguntas deben ser cortas y consisas para yo mostrarlo y solo quiero 4 preguntas ` */

  const { text } = await generateText({
    model: google("models/gemini-pro"),
    prompt,
  });
  return text;
}
