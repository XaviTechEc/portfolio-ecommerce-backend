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
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

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
  ): Promise<GetAllGenericResponse<Review>> {
    try {
      let queryOptions: FindManyOptions<Review> = {};
      let relations: FindOptionsRelations<Review> = {};
      let where: FindOptionsWhere<Review> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
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

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllReviews(
    args?: IGenericArgs<Review>,
  ): Promise<GetAllGenericResponse<Review>> {
    try {
      let qb = this._repository.createQueryBuilder('review');
      let pageSize;

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          if (searchTerm) {
            qb = qb
              .where(`review.content ILIKE LOWER(:content)`)
              .setParameters({
                content: `%${searchTerm}%`,
              });
          }
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
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
