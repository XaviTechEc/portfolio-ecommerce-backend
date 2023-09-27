import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { Review } from './postgresql/entities/Review.entity';
import { ReviewsRepository } from './postgresql/repositories/review.repository';
import { IReviewsDataSourceService } from 'src/reviews/domain/abstracts/services/reviews-datasource.abstract.service';

@Injectable()
export class ReviewsDataService
  implements IReviewsDataSourceService, OnApplicationBootstrap
{
  reviews: ReviewsRepository;
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.reviews = new ReviewsRepository(
      this.reviewsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
