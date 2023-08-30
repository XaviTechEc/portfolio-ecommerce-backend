import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateShoppingCartInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: any;
}

export class UpdateShoppingCartInput extends PartialType(
  CreateShoppingCartInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
