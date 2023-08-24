export class IReview {
  id: string;
  userId: string;
  orderedProductId: string;
  ratingValue: number;
  visible?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
