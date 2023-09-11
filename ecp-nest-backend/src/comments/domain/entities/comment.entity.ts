import { IReview } from 'src/reviews/domain/entities/review.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

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
