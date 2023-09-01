import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class ReviewsRepository<T> implements IReviewsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllReviews(args: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getReviewById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getReviewsBy(fields: Partial<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  createReview(createReviewInput: CreateReviewInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateReview(id: string, updateReviewInput: UpdateReviewInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeReview(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
