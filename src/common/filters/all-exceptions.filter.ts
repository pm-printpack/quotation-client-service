import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { FastifyReply } from "fastify";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const reply: FastifyReply = ctx.getResponse<FastifyReply>();
    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string = "";
    if (exception instanceof HttpException) {
      const response: string | object = exception.getResponse();
      message =
        response instanceof Object
          ? (response as { message: string }).message
          : (response as string);
    } else {
      message =
        exception instanceof Error
          ? exception.message
          : "Internal server error";
    }

    reply.status(status).send({
      statusCode: status,
      data: null,
      message
    });
  }
}