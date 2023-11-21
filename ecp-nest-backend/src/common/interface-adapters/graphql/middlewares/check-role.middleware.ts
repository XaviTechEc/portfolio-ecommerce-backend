import { ForbiddenException } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { matchRoles } from 'src/auth/infrastructure/helpers/match-roles.helper';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';

export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info, context } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];

  // Get the user's role from the context
  const userRoles = context.req.user.roles;
  const extensionRoles = extensions.roles as any;

  // Check if the user's role matches the required role
  if (!matchRoles(extensionRoles, userRoles)) {
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`,
    );
  }

  return next();
};
