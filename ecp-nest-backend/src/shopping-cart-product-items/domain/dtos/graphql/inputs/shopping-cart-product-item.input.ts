import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive, IsUUID, Min } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateShoppingCartProductItemInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shoppingCart: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productItem: any;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  quantity: number;
}

@InputType()
export class UpdateShoppingCartProductItemInput extends PartialType(
  CreateShoppingCartProductItemInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
