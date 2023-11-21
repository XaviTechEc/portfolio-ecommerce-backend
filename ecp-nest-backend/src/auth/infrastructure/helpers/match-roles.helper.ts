export function matchRoles<TRoleValue>(
  validRoles: TRoleValue[],
  roles: TRoleValue[],
): boolean {
  return validRoles.some((role) => roles.includes(role));
}
