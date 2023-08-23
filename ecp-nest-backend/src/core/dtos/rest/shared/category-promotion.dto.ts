import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCategoryPromotionDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  promotionId: string;
}

export class UpdateCategoryPromotionDto extends PartialType(
  CreateCategoryPromotionDto,
) {}
