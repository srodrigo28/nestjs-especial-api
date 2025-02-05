import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class ApiExcetionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus();
        const errorResponse = exception.getResponse()

        console.log("PASSANDO DENTRO DO FILTER ...............")

        response.status(400).json({
            message: "teste"
        })
    }
}