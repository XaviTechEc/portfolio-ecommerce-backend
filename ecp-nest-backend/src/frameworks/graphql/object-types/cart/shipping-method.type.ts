import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShippingMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;
}
