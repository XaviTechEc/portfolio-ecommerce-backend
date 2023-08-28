export class IComment {
  id: string;
  userId: string;
  content: string;
  visible?: boolean;
  reviewId: string;
  commentParentId: string;
  createdAt: Date;
  updatedAt?: Date;
}
