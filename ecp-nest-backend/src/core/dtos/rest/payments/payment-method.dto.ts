import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentMethods } from 'src/core/enums';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethods)
  value: string;
}

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
