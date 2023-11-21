import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethodEnum {
  CREDIT_CARD = 'credit_card',
  CASH = 'cash',
  OTHER = 'other',
}

registerEnumType(PaymentMethodEnum, { name: 'PaymentMethod' });
