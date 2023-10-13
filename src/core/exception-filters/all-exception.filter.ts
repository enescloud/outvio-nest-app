import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NotFoundError } from '@prisma/client/runtime';

/* The `AllExceptionsFilter` class is an exception filter in TypeScript that catches and handles all
exceptions thrown in a web application. */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log('AllExceptionsFilter: ', exception);
    let error = exception;

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (exception instanceof NotFoundError) {
      error = new NotFoundException(exception.message);
    }

    const httpStatus =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: String(httpAdapter.getRequestUrl(ctx.getRequest())),
      message: error instanceof HttpException ? error.message : undefined,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
