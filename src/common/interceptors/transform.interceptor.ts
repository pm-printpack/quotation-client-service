import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface ResponseEnvelope<T = any> {
  statusCode: number;
  data: T;
  message?: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseEnvelope<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseEnvelope<T>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map(data => ({
        statusCode: response.statusCode,
        data
      }))
    );
  }
}