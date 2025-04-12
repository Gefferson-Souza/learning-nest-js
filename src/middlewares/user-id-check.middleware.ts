import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Middleware de verificação de ID em execução...');
        const { id } = req.params;
        const numericId: number = parseInt(id, 10);
        if (isNaN(numericId) || numericId <= 0) {
            throw new BadRequestException('ID inválido!');
        }
        console.log('UserIdCheckMiddleware', 'depois de verificar o ID');
        next();
    }
}