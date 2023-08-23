import { Field, ID, PartialType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { StatusValue } from 'src/core/enums';

registerEnumType(StatusValue, { name: 'StatusVal' });

export class CreateOrderStatusInput {
  @Field(() => StatusValue, { defaultValue: StatusValue.IN_PROGRESS })
  @IsNotEmpty()
  @IsEnum(StatusValue)
  statusValue: StatusValue;
}

export class UpdateOrderStatusInput extends PartialType(
  CreateOrderStatusInput,
) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
