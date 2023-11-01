import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IReviewsDataSourceService } from 'src/reviews/domain/abstracts/services/reviews-datasource.abstract.service';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { ReviewFactoryService } from './factory/review-factory.service';

@Injectable()
export class ReviewUseCases {
  constructor(
    private dataService: IReviewsDataSourceService,
    private reviewFactoryService: ReviewFactoryService,
  ) {}
  getReviewsBy(
    term: string,
    fields: (keyof IReview)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.reviews.getReviewsBy(term, fields, paginationArgs);
  }
  getAllReviews(args?: IGenericArgs<IReview>) {
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
