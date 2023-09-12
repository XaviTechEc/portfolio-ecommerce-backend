import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { StatusValue } from 'src/order-status/domain/enums/status-value.enum';

@InputType()
export class CreateOrderStatusInput {
  @Field(() => StatusValue, { defaultValue: StatusValue.IN_PROGRESS })
  @IsNotEmpty()
  @IsEnum(StatusValue)
  statusValue: StatusValue;
}

@InputType()
export class UpdateOrderStatusInput extends PartialType(
  CreateOrderStatusInput,
) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
