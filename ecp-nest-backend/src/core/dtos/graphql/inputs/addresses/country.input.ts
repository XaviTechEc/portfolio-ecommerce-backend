import { PartialType, InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCountryInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  code: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  longName: string;
}

@InputType()
export class UpdateCountryInput extends PartialType(CreateCountryInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
