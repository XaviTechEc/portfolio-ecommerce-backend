import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { ICustomExceptionFormat } from 'src/common/domain/interfaces/exceptions/custom-exception-format.interface';
import { isQueryFailedError } from '../../../domain/utils/is-query-failed-error.util';

@Injectable()
export class ExceptionsService implements IExceptionsService {
  constructor(private loggerService: ILoggerService) {}

  notFound(data: ICustomExceptionFormat): never {
    throw new NotFoundException({
      ...data,
      code_error: HttpStatus.NOT_FOUND,
    } as ICustomExceptionFormat);
  }
  badRequest(data: ICustomExceptionFormat): never {
    throw new BadRequestException({
      ...data,
      code_error: HttpStatus.BAD_REQUEST,
    } as ICustomExceptionFormat);
  }
  internalServerError(data: ICustomExceptionFormat): never {
    throw new InternalServerErrorException({
      ...data,
      code_error: HttpStatus.INTERNAL_SERVER_ERROR,
    } as ICustomExceptionFormat);
  }
  forbiddenException(data: ICustomExceptionFormat): never {
    throw new ForbiddenException({
      ...data,
      code_error: HttpStatus.FORBIDDEN,
    } as ICustomExceptionFormat);
  }
  unauthorized(data: ICustomExceptionFormat): never {
    throw new UnauthorizedException({
      ...data,
      code_error: HttpStatus.UNAUTHORIZED,
    } as ICustomExceptionFormat);
  }

  notImplemented(data: ICustomExceptionFormat): never {
    throw new NotImplementedException({
      ...data,
      code_error: HttpStatus.NOT_IMPLEMENTED,
    } as ICustomExceptionFormat);
  }

  handler(error: any, context: string): never {
    this.loggerService.error(context, error, error.stack);
    if (isQueryFailedError(error)) {
      if (error) {
        const message =
          context.toUpperCase() + '| ' + error.detail ?? error.message;
        switch (error.code) {
          // Bad Request
          case '23505':
          case '22P02':
          case '42703':
            return this.badRequest({
              message,
            });
          // Not Found
          case '23503':
            return this.notFound({
              message,
            });
          default:
            return this.notImplemented({
              message,
            });
        }
      }
    }

    if (error.status) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return this.notFound({
          message: error.message,
        });
      }

      if (error.status === HttpStatus.BAD_REQUEST) {
        return this.badRequest({
          message: error.message,
        });
      }

      if (error.status === HttpStatus.FORBIDDEN) {
        return this.forbiddenException({
          message: error.message,
        });
      }

      if (error.status === HttpStatus.UNAUTHORIZED) {
        return this.unauthorized({
          message: error.message,
        });
      }
    }

    return this.internalServerError({
      message: `${context.toUpperCase()} | Please check server logs `,
    });
  }
}
