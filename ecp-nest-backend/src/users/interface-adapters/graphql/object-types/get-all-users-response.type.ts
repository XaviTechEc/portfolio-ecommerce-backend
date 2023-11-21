import { ObjectType, Field } from '@nestjs/graphql';
import { ICustomGenericResponseWithPagination } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export abstract class GetAllUsersResponse
  implements ICustomGenericResponseWithPagination<UserObjType>
{
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [UserObjType])
  data: UserObjType[];
}
