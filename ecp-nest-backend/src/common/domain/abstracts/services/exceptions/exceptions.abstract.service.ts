import { ICustomExceptionFormat } from 'src/common/domain/interfaces/exceptions/custom-exception-format.interface';

export abstract class IExceptionsService {
  abstract notFound(data: ICustomExceptionFormat): never;
  abstract badRequest(data: ICustomExceptionFormat): never;
  abstract internalServerError(data: ICustomExceptionFormat): never;
  abstract forbiddenException(data: ICustomExceptionFormat): never;
  abstract unauthorized(data: ICustomExceptionFormat): never;
  abstract handler(error: any, context: string): never;
}
