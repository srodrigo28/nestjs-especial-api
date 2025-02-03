import { ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";

export class LoggerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> |
    Promise<Observable<any>> {
        console.log('INTERCEPTANDO ESSA REQUISICAO')
        return next.handle().pipe()
    }
}