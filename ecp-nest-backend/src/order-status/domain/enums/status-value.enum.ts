import { registerEnumType } from '@nestjs/graphql';

export enum StatusValue {
  PLACED = 'placed',
  PROCESSING = 'processing',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
}
registerEnumType(StatusValue, { name: 'StatusValue' });
