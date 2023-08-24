import { IReview } from 'src/core/entities';

export abstract class IReviewsRepository {
  abstract getAllReviews(): Promise<IReview[]>;
  abstract getReviewById(id: string): Promise<IReview>;
  abstract getReviewsBy(fields: Partial<IReview>): Promise<IReview[]>;
  abstract createReview(createReviewInput: any): Promise<IReview>;
  abstract updateReview(id: string, updateReviewInput: any): Promise<IReview>;
  abstract removeReview(id: string): Promise<boolean>;
}
