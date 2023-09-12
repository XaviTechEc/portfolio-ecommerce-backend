import { IOrderLine } from 'src/order-lines/domain/entities/order-line.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IReview {
  id: string;
  ratingValue: number;
  content?: string;
  visible?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  user: IUser;
  orderLine: IOrderLine;
}
