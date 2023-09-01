import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserPaymentMethodDto {
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @IsNotEmpty()
  @IsUUID()
  paymentMethod: any;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  provider?: string;

  @IsOptional()
  @IsCreditCard()
  accountNumber?: string;

  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateUserPaymentMethodDto extends PartialType(
  CreateUserPaymentMethodDto,
) {}
