import express, { Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import { recomendationController } from "./RecomendationController";
import { geminiService } from "./GeminiService";


export class App {

    public server: express.Application;
    public router: express.Router;

    constructor() {
        this.server = express();
        this.router = express.Router();
        this.middleware();
        this.initRoutes();

        this.server.listen(3001, () => console.log('Server 3001'))
    }

    middleware() {
        this.router.use(express.json());
        this.router.use(express.urlencoded({ extended: true }));
        this.router.use((req, res, next) => {

            res.header("Access-Control-Allow-Origin", "*");

            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

            res.header("Access-Control-Allow-Headers", "Content-Type");

            this.router.use(cors())

            next();
        });
    }

    initRoutes(): void {
        this.router.post('/recomendations', async (req: Request, res: Response) => {
            try {
                const response = await geminiService.recomendations(req.body.question);
                return res.send(response);
            } catch (error) {
                return res.status(500).send(error);
            }
        });

        this.router.post('/recomendation', async (req: Request, res: Response) => {
            try {
                const response = await geminiService.recomendations(req.body.question);
                return res.send(response);
            } catch (error) {
                return res.status(500).send(error);
            }
        });

        this.server.use('/', this.router)

    }
}

new App();
