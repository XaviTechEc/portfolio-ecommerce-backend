import { Injectable } from '@nestjs/common';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';
import { ReviewFactoryService } from './review-factory.service';

@Injectable()
export class ReviewUseCases implements IReviewsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private reviewFactoryService: ReviewFactoryService,
  ) {}
  getAllReviews(): Promise<IReview[]> {
    return this.dataService.reviews.getAll();
  }
  getReviewById(id: string): Promise<IReview> {
    return this.dataService.reviews.getOneById(id);
  }
  getReviewsBy(fields: Partial<IReview>): Promise<IReview[]> {
    return this.dataService.reviews.getAllBy(fields);
  }
  createReview(createReviewInput: CreateReviewInput): Promise<IReview> {
    const review = this.reviewFactoryService.createReview(createReviewInput);
    return this.dataService.reviews.create(review);
  }
  updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<IReview> {
    const review = this.reviewFactoryService.updateReview(updateReviewInput);
    return this.dataService.reviews.updateOneById(id, review);
  }
  removeReview(id: string): Promise<IReview> {
    return this.dataService.reviews.deleteOneById(id);
  }
}
