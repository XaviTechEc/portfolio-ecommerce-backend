import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {}
