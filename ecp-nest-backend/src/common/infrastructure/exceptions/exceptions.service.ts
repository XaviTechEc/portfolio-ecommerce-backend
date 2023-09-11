import {
  ICustomExceptionFormat,
  IException,
} from 'src/core/interfaces/exceptions/exceptions.interface';
import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ExceptionsService implements IException {
  notFound(data: ICustomExceptionFormat): never {
    throw new NotFoundException(data);
  }
  badRequest(data: ICustomExceptionFormat): never {
    throw new BadRequestException(data);
  }
  internalServerError(data?: ICustomExceptionFormat): never {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: ICustomExceptionFormat): never {
    throw new ForbiddenException(data);
  }
  unauthorized(data?: ICustomExceptionFormat): never {
    throw new UnauthorizedException(data);
  }
}
