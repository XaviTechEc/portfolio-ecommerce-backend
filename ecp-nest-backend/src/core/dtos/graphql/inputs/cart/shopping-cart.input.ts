import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateShoppingCartInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;
}

@InputType()
export class UpdateShoppingCartInput extends PartialType(
  CreateShoppingCartInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
