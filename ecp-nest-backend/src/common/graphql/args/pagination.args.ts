import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { name: 'offset', nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Min(0)
  offset?: number;

  @Field(() => Int, { name: 'limit', nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Min(1)
  limit?: number;
}
