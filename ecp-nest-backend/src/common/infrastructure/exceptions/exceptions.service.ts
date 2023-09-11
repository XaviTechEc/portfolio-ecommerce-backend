import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IException,
  ICustomExceptionFormat,
} from 'src/common/domain/interfaces/exceptions/exceptions.interface';

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
