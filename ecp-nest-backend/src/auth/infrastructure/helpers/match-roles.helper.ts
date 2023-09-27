import { Role } from 'src/users/domain/enums';

export const matchRoles = (validRoles: Role[], roles: Role[]): boolean => {
  return validRoles.some((role) => roles.includes(role));
};
