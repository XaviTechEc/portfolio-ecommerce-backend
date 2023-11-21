import { ObjectType, Field } from '@nestjs/graphql';
import { ICustomGenericResponse } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';
import { RoleType } from './role.type';
import { CustomErrorType } from 'src/common/interface-adapters/graphql/object-types/generic-error-type';

@ObjectType()
export class GetRoleByNameResponseType
  implements ICustomGenericResponse<RoleType>
{
  @Field(() => Boolean)
  success: boolean;

  @Field(() => RoleType)
  data: RoleType;

  @Field(() => CustomErrorType, { nullable: true })
  error?: CustomErrorType;
}
