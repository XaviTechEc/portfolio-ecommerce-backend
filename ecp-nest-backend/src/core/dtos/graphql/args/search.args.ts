import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs<T> {
  @Field(() => String, { name: 'searchTerm', nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Field(() => [String], { name: 'searchFields', nullable: true })
  @IsOptional()
  @IsString({ each: true, always: true })
  searchFields?: Array<keyof T>;
}
