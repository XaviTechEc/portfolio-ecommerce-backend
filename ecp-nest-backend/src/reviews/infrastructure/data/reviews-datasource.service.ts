import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { Review } from './postgresql/entities/Review.entity';
import { ReviewsPostgresRepository } from './postgresql/repositories/review.repository';
import { IReviewsDataSourceService } from 'src/reviews/domain/abstracts/services/reviews-datasource.abstract.service';

@Injectable()
export class ReviewsDataService
  implements IReviewsDataSourceService, OnApplicationBootstrap
{
  reviews: ReviewsPostgresRepository<Review>;
  constructor(
    @InjectRepository(Review)
    private reviewsPostgresRepository: Repository<Review>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.reviews = new ReviewsPostgresRepository(
      this.reviewsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'review',
    );
  }
}
