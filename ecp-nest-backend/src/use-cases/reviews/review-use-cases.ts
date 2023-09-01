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
    throw new Error('Method not implemented.');
  }
  getReviewsBy(
    fields: Partial<IReview>,
    args?: IGenericArgs<IReview>,
  ): Promise<IReview[]> {
    throw new Error('Method not implemented.');
  }
  getReviewById(id: string): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  createReview(createReviewInput: CreateReviewInput): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  removeReview(id: string): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
}
