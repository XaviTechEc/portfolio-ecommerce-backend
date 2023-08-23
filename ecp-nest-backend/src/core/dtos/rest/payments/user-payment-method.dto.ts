import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserPaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  provider?: string;

  @IsCreditCard()
  @IsOptional()
  accountNumber?: string;

  @IsDate()
  @IsOptional()
  expiryDate?: Date;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class UpdateUserPaymentMethodDto extends PartialType(
  CreateUserPaymentMethodDto,
) {}
