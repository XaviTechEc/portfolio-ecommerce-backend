import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IGenericArgs } from '../../generic-args.repository';

export abstract class IReviewsRepository<T> {
  abstract getAllReviews(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getReviewsBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T[]>;
  abstract getReviewById(id: string): Promise<T>;
  abstract createReview(createReviewInput: CreateReviewInput): Promise<T>;
  abstract updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<T>;
  abstract removeReview(id: string): Promise<T>;
}
