import * as express from "express";
import { inject } from "inversify";
import { httpGet, BaseHttpController, interfaces, controller, request, httpPost, response } from "inversify-express-utils";

import { LoginRequestDto } from "../dto/login.request.dto";
import { SignUpRequestDto } from "../dto/signup.request.dto";
import Jwt from 'jsonwebtoken';
import { CustomRequest, JwtMiddleware } from "../middlewares/auth";
import { ClientRequestDto } from "../dto/client.request.dto";
import { GeminiService } from "../services/gemini";


@controller('/')
export class RecomendationController extends BaseHttpController implements interfaces.Controller {

    constructor(
        @inject(GeminiService) private readonly geminiService: GeminiService,
    ) { super(); }

    @httpPost("recomendation")
    public async getRecomendation(@request() req: CustomRequest, res: express.Response) {
        try {
            const response = await this.geminiService.recomendation(req.body.question);
            return this.ok(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @httpPost("recomendations")
    public async getRecomendations(@request() req: CustomRequest, res: express.Response) {
        try {
            const response = await this.geminiService.recomendations(req.body.question);
            return this.ok(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }


}