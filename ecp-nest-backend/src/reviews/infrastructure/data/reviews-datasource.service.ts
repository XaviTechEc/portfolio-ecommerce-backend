import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
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
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}
  onApplicationBootstrap() {
    this.reviews = new ReviewsRepository(
      this.reviewsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
