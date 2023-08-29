import { IOrderLine } from '../cart/order-line.entity';
import { IUser } from '../users/user.entity';

export class IReview {
  id: string;
  user: string | IUser;
  orderedProduct: string | IOrderLine;
  ratingValue: number;
  visible?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
