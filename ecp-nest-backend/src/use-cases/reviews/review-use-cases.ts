import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';
import { ReviewFactoryService } from './review-factory.service';

@Injectable()
export class ReviewUseCases implements IReviewsRepository<IReview> {
  constructor(
    private dataService: IDataSourcesService,
    private reviewFactoryService: ReviewFactoryService,
  ) {}
  getAllReviews(args?: IGenericArgs<IReview>): Promise<IReview[]> {
    return this.dataService.reviews.getAllReviews(args);
  }
  getReviewsBy(
    fields: Partial<IReview>,
    args?: IGenericArgs<IReview>,
  ): Promise<IReview[]> {
    return this.dataService.reviews.getReviewsBy(fields, args);
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
