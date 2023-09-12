import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { PaymentMethod } from 'src/payment-methods/domain/enums/payment-methods.enum';

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
