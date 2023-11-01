import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from '../../dtos/graphql/inputs/review.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IReviewsRepository<T> {
  abstract getAllReviews(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
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
  ): Promise<GetAllGenericResponse<T>>;
}
