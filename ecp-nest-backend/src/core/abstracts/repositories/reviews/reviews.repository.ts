import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';

export abstract class IReviewsRepository {
  abstract getAllReviews(): Promise<IReview[]>;
  abstract getReviewById(id: string): Promise<IReview>;
  abstract getReviewsBy(fields: Partial<IReview>): Promise<IReview[]>;
  abstract createReview(createReviewInput: CreateReviewInput): Promise<IReview>;
  abstract updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<IReview>;
  abstract removeReview(id: string): Promise<IReview>;
}
