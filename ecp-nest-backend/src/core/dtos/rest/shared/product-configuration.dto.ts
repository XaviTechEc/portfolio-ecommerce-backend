import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductConfigurationDto {
  @IsNotEmpty()
  @IsUUID()
  productItemId: string;

  @IsNotEmpty()
  @IsUUID()
  variationOptionId: string;
}

export class UpdateProductConfigurationDto extends PartialType(
  CreateProductConfigurationDto,
) {}
