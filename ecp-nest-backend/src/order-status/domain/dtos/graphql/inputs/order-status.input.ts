import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { StatusValue } from 'src/order-status/domain/enums/status-value.enum';

@InputType()
export class CreateOrderStatusInput extends IGenericAdditionalProps {
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
