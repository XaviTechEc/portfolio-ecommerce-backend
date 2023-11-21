import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PaymentMethodEnum } from 'src/payment-methods/domain/enums/payment-methods.enum';

@InputType()
export class CreatePaymentMethodInput extends IGenericAdditionalProps {
  @Field(() => PaymentMethodEnum)
  @IsNotEmpty()
  @IsEnum(PaymentMethodEnum)
  value: PaymentMethodEnum;
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
