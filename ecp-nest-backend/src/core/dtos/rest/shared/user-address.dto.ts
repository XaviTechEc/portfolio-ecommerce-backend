import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserAddressDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  addressId: string;

  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean = true;
}

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
