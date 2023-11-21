import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateShopOrderInput extends IGenericAdditionalProps {
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  orderTotal: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shippingMethod: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  orderStatus: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userPaymentMethod: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  address: any;
}

@InputType()
export class UpdateShopOrderInput extends PartialType(CreateShopOrderInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
