import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { CreateReviewInput, UpdateReviewInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Review } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

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
  async getReviewsBy(
    fields: Partial<Review>,
    args?: IGenericArgs<Review>,
  ): Promise<Review[]> {
    throw new Error('Method not implemented.');
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
