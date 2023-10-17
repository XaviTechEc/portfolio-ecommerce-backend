import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validateDestination } from '../helpers/validate-destination.helper';
import { ValidFileDestination } from '../interfaces/valid-file-destination.type';

@Injectable()
export class ValidFileDestinationPipe
  implements PipeTransform<ValidFileDestination, string>
{
  transform(value: ValidFileDestination, metadata: ArgumentMetadata): string {
    const { isValid, value: validValue } = validateDestination(value);

    if (!isValid) {
      throw new BadRequestException(`Invalid destination: ${value}`);
    }

    return validValue;
  }
}
