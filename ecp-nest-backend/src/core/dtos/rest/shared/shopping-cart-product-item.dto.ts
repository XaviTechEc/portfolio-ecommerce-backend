import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreateShoppingCartProductItemDto {
  @IsNotEmpty()
  @IsString()
  shoppingCartId: string;

  @IsNotEmpty()
  @IsString()
  productItemId: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  quantity: number;
}

export class UpdateShoppingCartProductItemDto extends PartialType(
  CreateShoppingCartProductItemDto,
) {}
