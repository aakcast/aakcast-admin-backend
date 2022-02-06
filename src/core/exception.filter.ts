import { HttpAdapterHost } from '@nestjs/core';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as http from 'http';
import { ServiceError } from '@grpc/grpc-js';

/**
 * Determine given exception is HttpException or not
 * @param {?} x - Unknown xxception
 */
function isHttpException(x: any): x is HttpException {
  return x instanceof HttpException;
}

/**
 * Determine given exception is from microservices
 * @param {?} x - Unknown xxception
 */
function isGrpcError(x: any): x is ServiceError {
  return 'code' in x && 'details' in x && 'metadata' in x;
}

// Exception filter for any kind of exception
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    let httpException: HttpException;

    if (!isHttpException(exception)) {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Unknown';

      // Handle exceptions propagated from microservices
      if (isGrpcError(exception) && exception.details) {
        const match = exception.details.match(/^(\d{3}) (.*)$/);
        if (match) {
          statusCode = parseInt(match[1]);
          message = match[2];
        } else {
          message = exception.details;
        }
      }

      const response = {
        statusCode,
        message,
        error: http.STATUS_CODES[statusCode],
      };
      httpException = new HttpException(response, statusCode);
    }

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    httpAdapter.reply(
      ctx.getResponse(),
      httpException.getResponse(),
      httpException.getStatus(),
    );
  }
}
