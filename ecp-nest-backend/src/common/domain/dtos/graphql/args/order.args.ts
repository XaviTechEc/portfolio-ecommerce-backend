import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderType, { name: 'OrderType' });

@InputType()
export class OrderFieldType<TData = any> {
  @Field(() => String)
  field: keyof TData;

  @Field(() => OrderType)
  order: OrderType;
}
