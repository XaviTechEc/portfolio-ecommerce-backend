import { Field, ID } from '@nestjs/graphql';

export class TagType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  value: string;
}
