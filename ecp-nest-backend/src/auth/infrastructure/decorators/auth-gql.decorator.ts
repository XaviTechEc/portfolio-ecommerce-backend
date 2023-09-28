import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/users/domain/enums';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UserRolesGqlGuard } from '../guards/user-role-gql.guard';
import { RoleProtected } from './role-protected.decorator';

export function AuthGql(...roles: Role[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(GqlAuthGuard, UserRolesGqlGuard),
  );
}
