import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';
import { IGenericArgs } from '../../generic-data-methods.repository';

export abstract class IReviewsRepository<T> {
  abstract getAllReviews(args: IGenericArgs<T>): Promise<T[]>;
  // abstract getReviewById(id: string): Promise<T>;
  // abstract getReviewsBy(fields: Partial<T>): Promise<T[]>;
  // abstract createReview(createReviewInput: CreateReviewInput): Promise<T>;
  // abstract updateReview(
  //   id: string,
  //   updateReviewInput: UpdateReviewInput,
  // ): Promise<T>;
  // abstract removeReview(id: string): Promise<T>;
}
