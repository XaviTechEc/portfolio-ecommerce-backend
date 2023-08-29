import { IUser } from '../users/user.entity';

export class IComment {
  id: string;
  user: string | IUser;
  content: string;
  visible?: boolean;
  reviewId: string;
  commentParentId: string;
  createdAt: Date;
  updatedAt?: Date;
}
