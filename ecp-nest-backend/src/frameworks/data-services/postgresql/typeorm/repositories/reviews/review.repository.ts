import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Review } from '../../entities/outputs/entities';

export class ReviewsRepository implements IReviewsRepository<Review> {
  private _repository: Repository<Review>;

  constructor(repository: Repository<Review>) {
    this._repository = repository;
  }
  getAllReviews(args?: IGenericArgs<Review>): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }
  getReviewsBy(
    fields: Partial<Review>,
    args?: IGenericArgs<Review>,
  ): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }
  getReviewById(id: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  createReview(createReviewInput: CreateReviewInput): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  removeReview(id: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
}
