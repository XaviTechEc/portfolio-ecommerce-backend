import { LoggerService } from '@nestjs/common';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { IReviewsRepository } from 'src/reviews/domain/abstracts/repositories/reviews.repository';
import {
  CreateReviewInput,
  UpdateReviewInput,
} from 'src/reviews/domain/dtos/graphql/inputs/review.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Review } from '../entities/Review.entity';

export class ReviewsRepository implements IReviewsRepository<Review> {
  private _repository: Repository<Review>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Review>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getReviewsBy(
    term: string,
    fields: (keyof Review)[],
    paginationArgs: PaginationArgs,
  ): Promise<Review[]> {
    let queryOptions: FindManyOptions<Review> = {};
    let relations: FindOptionsRelations<Review> = {};
    let where: FindOptionsWhere<Review> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    for (const field of fields) {
      if (field === 'user') {
        relations = { ...relations, user: true };
        where = {
          ...where,
          user: [
            { username: ILike(`%${term}%`) },
            { email: ILike(`%${term}%`) },
            { fullName: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'orderLine') {
        relations = { ...relations, orderLine: true };
        where = {
          ...where,
          orderLine: { id: term },
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const reviewsBy = await this._repository.find(queryOptions);
    return reviewsBy;
  }

  async getAllReviews(args?: IGenericArgs<Review>): Promise<Review[]> {
    let qb = this._repository.createQueryBuilder('review');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb.where(`review.content ILIKE LOWER(:content)`).setParameters({
          content: `%${searchTerm}%`,
        });
      }
    }

    const reviews = await qb.getMany();
    return reviews;
  }

  async getReviewById(id: string): Promise<Review> {
    const reviewFound = await this._repository.findOneBy({ id });
    if (!reviewFound) {
      return this._exceptionsService.notFound({
        message: `The review with id ${id} could not be found`,
      });
    }
    return this._repository.save(reviewFound);
  }
  async createReview(createReviewInput: CreateReviewInput): Promise<Review> {
    const newReview = this._repository.create({ ...createReviewInput });
    return newReview;
  }
  async updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<Review> {
    await this.getReviewById(id);
    const newReview = await this._repository.preload({
      ...updateReviewInput,
    });
    if (!newReview) {
      return this._exceptionsService.notFound({
        message: 'The Review could not be preloaded',
      });
    }
    return this._repository.save(newReview);
  }
  async removeReview(id: string): Promise<Review> {
    const review = await this.getReviewById(id);
    return this._repository.remove(review);
  }
}
