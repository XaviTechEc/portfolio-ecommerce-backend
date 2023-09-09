import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  CASH = 'cash',
  OTHER = 'other',
}

registerEnumType(PaymentMethod, { name: 'PaymentMethod' });
