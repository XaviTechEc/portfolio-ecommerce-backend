import { registerEnumType } from '@nestjs/graphql';

export enum UserType {
  EMAIL = 'email',
  GOOGLE = 'google',
}
registerEnumType(UserType, { name: 'UserType' });
