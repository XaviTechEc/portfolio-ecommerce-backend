import {
  IGenericArgs,
  CreateReviewInput,
  UpdateReviewInput,
  PaginationArgs,
} from 'src/core/dtos';

export abstract class IReviewsRepository<T> {
  abstract getAllReviews(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getReviewById(id: string): Promise<T>;
  abstract createReview(createReviewInput: CreateReviewInput): Promise<T>;
  abstract updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<T>;
  abstract removeReview(id: string): Promise<T>;
  abstract getReviewsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
