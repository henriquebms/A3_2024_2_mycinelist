import { inject, injectable } from "inversify";
import { LoginRequestDto } from "../dto/login.request.dto";
import { SignUpRequestDto } from "../dto/signup.request.dto";
import Jwt from 'jsonwebtoken';
import { hash, verifyPassword } from "../utils/bcrypt";
import { LogRepository } from "../repositories/log";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { Log } from "../models/logs";

@injectable()
export class GeminiService {

    ia: GenerativeModel;

    constructor(
        @inject(LogRepository)
        private readonly logRepository: LogRepository
    ) {
        const genAI = new GoogleGenerativeAI(process.env.IA_KEY || "");
        this.ia = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async recomendations(question = '') {
        const initQuestion = `
            me de { list: [ { 
            title: 'titulo do filme', 
            description: 'descricao do filme', 
            image_url: 'url da imagem do titulo do filme'  
            } ] }, a lista deve ter 3 filmes
        `;
        try {

            const result = await this.ia.generateContent(initQuestion + " e o usuario busca por: " + question);
            const response = result.response.text();

            await this.registerLog({
                question: initQuestion + " e o usuario busca por: " + question,
                response,
                createdAt: new Date().toISOString()
            });

            return response.replace("```json", "").replace("```", "").trim(); 
        } catch (error) {
            throw error;
        }
    }

    async recomendation(question = '') {
        const initQuestion = `
            me de { 
                title: 'titulo do filme', 
                description: 'descricao do filme',
                recommendation: 'recomendacao do filme',
                tags: [ 'tags do filme (no maximo 6)' ]  
            }, do filme
        `;
        try {

            const result = await this.ia.generateContent(initQuestion + " " + question);
            const response = result.response.text();

            await this.registerLog({
                question: initQuestion + " " + question,
                response,
                createdAt: new Date().toISOString()
            });

            return response.replace("```json", "").replace("```", "").trim(); 
        } catch (error) {
            throw error;
        }
    }

    async registerLog (log: Log) {
        await this.logRepository.save(new Log(log));
    }

}