import Log from "./log.entity.js";
import AppDataSource from './database.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {

    async ask (question) {
        this.registerLog({
            question,
            response,
            createdAt: new Date().toISOString()
        });
    }

    async recomendations (question = '') {

        const initQuestion = `
            me de { list: [ { 
            title: 'titulo do filme', 
            description: 'descricao do filme', 
            image_url: 'url da imagem do titulo do filme'  
            } ] }, a lista deve ter 3 filmes
        `;

        const genAI = new GoogleGenerativeAI(process.env.IA_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(initQuestion + " e o usuario busca por: " + question);
        const response = result.response.text();

        this.registerLog({
            question,
            response,
            createdAt: new Date().toISOString()
        });

        return response.replace("```json", "").replace("```", "").trim();
    }

    async recomendation (movie = '') {

        const initQuestion = `
            me de { 
                recomendation: 'recomendacao do filme',
                tags: [ 'tags do filme (no maximo 6)' ]  
            }, do filme
        `;

        const genAI = new GoogleGenerativeAI(process.env.IA_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(initQuestion + " " + movie);
        const response = result.response.text();

        return response.replace("```json", "").replace("```", "").trim();
    }

    async registerLog (newLog) {
        const log = new Log(newLog);
        await AppDataSource.manager.save(log);
    }
}

export default GeminiService;