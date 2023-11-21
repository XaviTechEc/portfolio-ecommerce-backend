import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateOrderLineInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productItem: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shopOrder: any;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  totalPrice: number;
}

@InputType()
export class UpdateOrderLineInput extends PartialType(CreateOrderLineInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
