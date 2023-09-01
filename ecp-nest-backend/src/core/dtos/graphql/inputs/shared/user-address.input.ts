import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateUserAddressInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  address: string;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;
}

@InputType()
export class UpdateUserAddressInput extends PartialType(
  CreateUserAddressInput,
) {}
