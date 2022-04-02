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
      let response: Record<string, any>;
      let status: number;

      if (isGrpcError(exception) && exception.details) {
        response = JSON.parse(exception.details);
        status = response.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        response = {
          statusCode: status,
          message: exception.message || 'Unknown',
          error: http.STATUS_CODES[status],
        };
      }

      httpException = new HttpException(response, status);
    }

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    httpAdapter.reply(ctx.getResponse(), httpException.getResponse(), httpException.getStatus());
  }
}
