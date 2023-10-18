import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateShopOrderLocationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shopOrder: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  location: any;
}

@InputType()
export class UpdateShopOrderLocationInput extends PartialType(
  CreateShopOrderLocationInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
