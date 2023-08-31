import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  extension: string;

  @IsOptional()
  @IsUUID()
  productId?: any;

  @IsOptional()
  @IsUUID()
  productItemId?: any;

  @IsOptional()
  @IsUUID()
  categoryId?: any;

  @IsNotEmpty()
  @IsUUID()
  uploadedBy: any;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
