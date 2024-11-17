import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
require('dotenv').config();
import "./controllers/recomendation"
import cors from 'cors';
import { LogRepository } from "./repositories/log";
import { GeminiService } from "./services/gemini";

let container = new Container();

export class App {

    constructor() {
        this.configDependencies();
        this.createServer();
    }

    configDependencies(): void {
        //Auth
        container.bind<LogRepository>(LogRepository).to(LogRepository);
        container.bind<GeminiService>(GeminiService).to(GeminiService);
    }

    createServer(): void {
        let server: InversifyExpressServer = new InversifyExpressServer(container);

        server.setConfig((app) => {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use(
                cors({
                    origin: 'http://localhost:3000',
                    methods: ['GET', 'POST', 'PUT', 'DELETE'],
                    credentials: true
                })
            )
        });

        let app = server.build();
        app.listen(process.env.server_port);
        console.log("iniciado na porta ", process.env.server_port)
    }

}

export default new App();