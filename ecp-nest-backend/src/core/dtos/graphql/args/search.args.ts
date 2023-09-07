import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs {
  @Field(() => String, { name: 'searchTerm', nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
