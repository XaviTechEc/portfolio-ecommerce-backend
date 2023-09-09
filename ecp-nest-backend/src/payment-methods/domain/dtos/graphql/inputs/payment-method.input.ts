import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { PaymentMethod } from 'src/core/enums';

@InputType()
export class CreatePaymentMethodInput {
  @Field(() => PaymentMethod)
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  value: PaymentMethod;
}

@InputType()
export class UpdatePaymentMethodInput extends PartialType(
  CreatePaymentMethodInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
