import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StatusValue } from 'src/core/enums';

@ObjectType()
export class OrderStatusType {
  @Field(() => ID)
  id: string;

  @Field(() => StatusValue)
  statusValue: StatusValue;
}
