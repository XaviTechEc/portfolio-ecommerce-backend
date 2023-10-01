import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateBillboardInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  store: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  season: any;
}

@InputType()
export class UpdateBillboardInput extends PartialType(CreateBillboardInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
