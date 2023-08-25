import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentMethod } from 'src/core/enums';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  value: string;
}

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
