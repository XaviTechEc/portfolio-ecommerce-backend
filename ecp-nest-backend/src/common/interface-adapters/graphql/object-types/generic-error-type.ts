import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ICustomError } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';

@ObjectType()
export class CustomErrorType implements ICustomError {
  @Field(() => Int)
  code: number;

  @Field(() => String)
  message: string;
}
