import { PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PaymentMethods } from 'src/core/enums';

export class CreatePaymentMethodDto {
  @IsEnum(PaymentMethods)
  value: string;
}

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
