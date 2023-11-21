import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateCategoryPromotionInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  category: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  promotion: any;
}

@InputType()
export class UpdateCategoryPromotionInput extends PartialType(
  CreateCategoryPromotionInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
