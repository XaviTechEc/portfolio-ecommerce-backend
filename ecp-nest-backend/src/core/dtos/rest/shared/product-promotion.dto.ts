import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductPromotionDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  promotionId: string;
}

export class UpdateProductPromotionDto extends PartialType(
  CreateProductPromotionDto,
) {}
