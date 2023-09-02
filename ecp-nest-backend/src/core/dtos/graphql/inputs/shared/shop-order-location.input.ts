import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
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
