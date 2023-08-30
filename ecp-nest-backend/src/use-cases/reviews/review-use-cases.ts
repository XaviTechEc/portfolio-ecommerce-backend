import { Injectable } from '@nestjs/common';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { IReview } from 'src/core/entities';
import { ReviewFactoryService } from './review-factory.service';
import { PaginationArgs, SearchArgs } from 'src/common/graphql/args';
import { IGenericArgs } from 'src/core/abstracts/generic-data-methods.repository';

@Injectable()
export class ReviewUseCases implements IReviewsRepository<IReview> {
  constructor(
    private dataService: IDataSourcesService,
    private reviewFactoryService: ReviewFactoryService,
  ) {}
  getAllReviews(args?: IGenericArgs<IReview>): Promise<IReview[]> {
    return this.dataService.reviews.getAllReviews(args);
  }
}
