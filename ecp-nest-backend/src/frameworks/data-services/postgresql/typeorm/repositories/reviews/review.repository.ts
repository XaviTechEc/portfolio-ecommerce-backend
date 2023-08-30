import { PaginationArgs, SearchArgs } from 'src/common/graphql/args';
import { IGenericArgs } from 'src/core/abstracts/generic-data-methods.repository';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';
import { Repository } from 'typeorm';
import { Review } from '../../entities/outputs/entities';

export class ReviewRepository implements IReviewsRepository<Review> {
  constructor(private reviewRepo = Repository<Review>) {}
  getAllReviews(args: IGenericArgs<Review>): Promise<Review[]> {
    throw new Error('Method not implemented.');
  }
  getReviewById(id: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }
  getReviewsBy(fields: Partial<Review>): Promise<Review[]> {
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
