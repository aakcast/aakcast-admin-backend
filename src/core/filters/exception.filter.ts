import { HttpAdapterHost } from '@nestjs/core';
import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ServiceError } from '@grpc/grpc-js';
import * as http from 'http';

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

/**
 * ExceptionFilter: Handle all kinds of exceptions
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * Constructor
   * @param httpAdapterHost
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    let httpException: HttpException;

    if (isHttpException(exception)) {
      // Bypass
      httpException = exception;
    } else {
      // Transform to HttpException

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
    httpAdapter.reply(ctx.getResponse(), httpException.getResponse(), httpException.getStatus());
  }
}
