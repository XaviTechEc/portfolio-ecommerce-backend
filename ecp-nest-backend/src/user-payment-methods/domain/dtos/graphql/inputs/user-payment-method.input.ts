import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import {
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateUserPaymentMethodInput extends IGenericAdditionalProps {
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
