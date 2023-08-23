import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductTagDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  tagId: string;
}

export class UpdateProductTagDto extends PartialType(CreateProductTagDto) {}
