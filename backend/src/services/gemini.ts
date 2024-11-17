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

    async recomendations(question: string) {
        const initQuestion = `
            quero um array de filmes desse tipo { list: [ { 
            title: 'titulo do filme', 
            description: 'descricao do filme'
            } ] }, quero apenas o json formatado, a lista deve ter 3 filmes
        `;

        const result = await this.ia.generateContent(initQuestion + " e o usuario busca por: " + question);
        const response = result.response.text();

        this.registerLog({
            question,
            response: JSON.parse(response.replace("```json", "").replace("```", "").trim()),
            createdAt: new Date().toISOString()
        });

        return JSON.parse(response.replace("```json", "").replace("```", "").trim());
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

    async registerLog(log: Log) {
        await this.logRepository.save(new Log(log));
    }

}