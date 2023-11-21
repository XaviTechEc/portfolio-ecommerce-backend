import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateShopOrderLocationInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shopOrder: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  location: any;
}

@InputType()
export class UpdateShopOrderLocationInput extends PartialType(
  CreateShopOrderLocationInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
