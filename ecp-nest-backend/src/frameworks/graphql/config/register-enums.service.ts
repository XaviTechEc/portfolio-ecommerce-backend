import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import {
  Gender,
  PaymentMethod,
  Role,
  StatusValue,
  UserType,
} from 'src/core/enums';

@Injectable()
export class RegisterEnumsService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    registerEnumType(StatusValue, { name: 'StatusValue' });
    registerEnumType(PaymentMethod, { name: 'PaymentMethod' });
    registerEnumType(Gender, { name: 'Gender' });
    registerEnumType(Role, { name: 'Role' });
    registerEnumType(UserType, { name: 'UserType' });
  }
}
