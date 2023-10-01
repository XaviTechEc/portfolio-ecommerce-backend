import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
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

const CONTEXT = 'ReviewsRepository';

export class ReviewsRepository implements IReviewsRepository<Review> {
  private _repository: Repository<Review>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Review>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
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
    try {
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

      const reviewsBy = (await this._repository.find(queryOptions)) ?? [];
      return reviewsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllReviews(args?: IGenericArgs<Review>): Promise<Review[]> {
    try {
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

      const reviews = (await qb.getMany()) ?? [];
      return reviews;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getReviewById(id: string): Promise<Review> {
    try {
      const reviewFound = await this._repository.findOneBy({ id });
      if (!reviewFound) {
        return this._exceptionsService.notFound({
          message: `The review with id ${id} could not be found`,
        });
      }
      return reviewFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createReview(createReviewInput: CreateReviewInput): Promise<Review> {
    try {
      const newReview = this._repository.create({ ...createReviewInput });
      return this._repository.save(newReview);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateReview(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<Review> {
    try {
      await this.getReviewById(id);
      const newReview = await this._repository.preload({
        ...updateReviewInput,
      });
      return this._repository.save(newReview);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeReview(id: string): Promise<Review> {
    try {
      const review = await this.getReviewById(id);
      return this._repository.remove(review);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
