
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMealAdvice = async (glucoseLevel: number, timeOfDay: string) => {
  const prompt = `User's current glucose is ${glucoseLevel} mg/dL at ${timeOfDay}. 
  Suggest 3 diabetic-friendly meal options, especially considering local African ingredients like yams, cassava, and greens (if relevant). 
  Return as JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            glycemicIndex: { type: Type.STRING },
            calories: { type: Type.NUMBER }
          },
          required: ["name", "ingredients", "glycemicIndex", "calories"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const analyzeFoodImage = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: "Identify this food and rate its suitability for a diabetic person (High/Medium/Low suitability). Provide a brief explanation." }
      ]
    }
  });
  return response.text;
};

export const askHealthQuestion = async (question: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: "You are a professional medical assistant specialized in diabetes. Provide accurate, empathetic, and simple advice. Always advise consulting a doctor for critical decisions."
    }
  });
  return response.text;
};
