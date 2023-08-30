import { IReview } from '../reviews/review.entity';
import { IUser } from '../users/user.entity';

export class IComment {
  id: string;
  content: string;
  visible?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  review: IReview;
  user: IUser;
  comment?: IComment;
}
