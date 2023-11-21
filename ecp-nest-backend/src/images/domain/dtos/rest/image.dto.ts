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
  product?: any;

  @IsOptional()
  @IsUUID()
  productItem?: any;

  @IsOptional()
  @IsUUID()
  category?: any;

  @IsOptional()
  @IsUUID()
  billboard?: any;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
