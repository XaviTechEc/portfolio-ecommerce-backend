import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateUserPaymentMethodInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  paymentMethod: any;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  provider?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsCreditCard()
  accountNumber?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

@InputType()
export class UpdateUserPaymentMethodInput extends PartialType(
  CreateUserPaymentMethodInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
