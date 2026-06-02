"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export const structureData = async (data: string) => {
    const model = 'gemma-4-31b-it';
    const prompt = 'Please structure the following data for a brochure, try to extract as much information as possible include different data such as contact and other stuff:\n\n' + data;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        // Return the actual text!
        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Failed to generate structure. Please check API Key and console logs.";
    }
}

export const createMarkdownBroucher = async (data: string | null | undefined, style: string | null | undefined) => {
    const model = 'gemma-4-31b-it';
    const prompt = `You are an expert designer and copywriter. I want you to create a markdown brochure for a company with the structured data provided below.

Data:
${data}

Style to apply: ${style}

Use the style provided and create a professional, well-structured markdown brochure. Do NOT use emojis anywhere. Use formal, polished business language throughout. Structure it clearly with markdown headings (# for the company title, ## for section headings), bullet points for services and features, and concise paragraphs for descriptions. Include the following sections: About Us, Our Services, Why Choose Us, and Contact Information.`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Failed to generate brochure markdown.";
    }
}
