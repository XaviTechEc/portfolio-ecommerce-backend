import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs<TData = any> {
  @Field(() => String, { name: 'term', nullable: true })
  @IsOptional()
  @IsString()
  term?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  fields?: (keyof TData)[];
}
