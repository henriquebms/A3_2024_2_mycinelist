import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {

    ia: GenerativeModel;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.IA_KEY || "");
        this.ia = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async recomendations(question: string) {
        const initQuestion = `
            quero uma lista de filmes desse tipo { list: [ { 
            title: 'titulo do filme', 
            description: 'descricao do filme'
            } ] }, quero apenas o json, a lista deve ter 3 filmes
        `;

        const result = await this.ia.generateContent(initQuestion + " e o usuario busca por: " + question);
        const response = result.response.text();

        this.registerLog({
            question,
            response,
            createdAt: new Date().toISOString()
        });

        return response.replace("```json", "").replace("```", "").trim();
    }

    async recomendation(movie: string) {
        const initQuestion = `
            me de { 
                title: 'titulo do filme', 
                description: 'descricao do filme',
                recommendation: 'recomendacao do filme',
                tags: [ 'tags do filme (no maximo 6)' ]  
            }, do filme
        `;

        const result = await this.ia.generateContent(initQuestion + " " + movie);
        const response = result.response.text();

        this.registerLog({
            question: initQuestion + " " + movie,
            response,
            createdAt: new Date().toISOString()
        });

        return response.replace("```json", "").replace("```", "").trim();
    }

    async registerLog (log: any) {

    }
}

export const geminiService = new GeminiService(); 