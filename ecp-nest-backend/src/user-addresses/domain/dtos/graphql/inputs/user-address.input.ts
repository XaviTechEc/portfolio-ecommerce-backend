import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateUserAddressInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  address: any;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isDefault?: boolean;
}

@InputType()
export class UpdateUserAddressInput extends PartialType(
  CreateUserAddressInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
