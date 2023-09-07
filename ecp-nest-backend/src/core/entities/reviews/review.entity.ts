import { IOrderLine } from '../cart/order-line.entity';
import { IUser } from '../users/user.entity';

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
