import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

registerEnumType(Gender, { name: 'Gender' });
