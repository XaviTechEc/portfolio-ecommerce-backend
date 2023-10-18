import
  {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
import { IJwtService } from '../../../common/domain/abstracts/services/jwt/jwt.abstract.service';

@Injectable()
export class ValidTokenPipe implements PipeTransform {
  constructor(private _jwtService: IJwtService) {}

  transform(value: string, metadata: ArgumentMetadata) {
    try {
      this._jwtService.verifySync(value);
      return value;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
