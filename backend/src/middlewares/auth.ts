import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { injectable, inject } from 'inversify';

export interface CustomRequest extends Request {
    user?: any;
}


@injectable()
export class JwtMiddleware {
    constructor(
    ) {}

    public async use(req: CustomRequest, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido!' });
        }

        try {
            const decoded = jwt.verify(token, process.env.jwtSecret || 'teste') as User;
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: 'Token inválido!' });
        }
    }
}
