import { Field, ID } from '@nestjs/graphql';
import { VariationType } from './variation.entity.type';

export class VariationOptionType {
  @Field(() => ID)
  id: string;

  @Field(() => VariationType)
  variation: VariationType;

  @Field(() => String)
  value: string;
}
