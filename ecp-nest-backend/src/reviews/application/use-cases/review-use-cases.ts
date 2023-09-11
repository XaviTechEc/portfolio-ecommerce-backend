import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IReviewsRepository } from 'src/reviews/domain/abstracts/repositories/reviews.repository';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { ReviewFactoryService } from './factory/review-factory.service';

@Injectable()
export class ReviewUseCases implements IReviewsRepository<IReview> {
  constructor(
    private dataService: IDataSourcesService,
    private reviewFactoryService: ReviewFactoryService,
  ) {}
  getReviewsBy(
    term: string,
    fields: (keyof IReview)[],
    paginationArgs: PaginationArgs,
  ): Promise<IReview[]> {
    return this.dataService.reviews.getReviewsBy(term, fields, paginationArgs);
  }
  getAllReviews(args?: IGenericArgs<IReview>): Promise<IReview[]> {
    return this.dataService.reviews.getAllReviews(args);
  }

  getReviewById(id: string): Promise<IReview> {
    return this.dataService.reviews.getReviewById(id);
  }
  createReview(createReviewInput: CreateReviewInput): Promise<IReview> {
    const review = this.reviewFactoryService.createReview(createReviewInput);
    return this.dataService.reviews.createReview(review);
  }
  updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<IReview> {
    const review = this.reviewFactoryService.updateReview(updateReviewInput);
    return this.dataService.reviews.updateReview(id, review);
  }
  removeReview(id: string): Promise<IReview> {
    return this.dataService.reviews.removeReview(id);
  }
}
