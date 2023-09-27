import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { ICustomExceptionFormat } from 'src/common/domain/interfaces/exceptions/custom-exception-format.interface';

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

  handler(error: any, context: string): never {
    if (error.code) {
      if (error.code === '23505') {
        this.badRequest({
          message: error.detail,
        });
      }
      if (error.code === '23503') {
        this.notFound({
          message: error.detail,
        });
      }

      if (error.code === '22P02') {
        this.badRequest({
          message: error.detail,
        });
      }
    }

    if (error.status) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.notFound({
          message: error.message,
        });
      }

      if (error.status === HttpStatus.BAD_REQUEST) {
        this.badRequest({
          message: error.message,
        });
      }

      if (error.status === HttpStatus.FORBIDDEN) {
        this.forbiddenException({
          message: error.message,
        });
      }

      if (error.status === HttpStatus.UNAUTHORIZED) {
        this.unauthorized({
          message: error.message,
        });
      }
    }

    this.loggerService.error(context, error, error.stack);
    this.internalServerError({
      message: `${context.toUpperCase()} | Please check server logs `,
    });
  }
}
