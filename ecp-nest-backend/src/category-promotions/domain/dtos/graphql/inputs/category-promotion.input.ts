import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateCategoryPromotionInput {
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
