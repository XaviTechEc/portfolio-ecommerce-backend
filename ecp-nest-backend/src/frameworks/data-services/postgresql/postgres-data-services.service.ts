import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';

import { IReviewsRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { Review, User } from './typeorm/entities/outputs/entities';

@Injectable()
export class PostgresDataServices
  implements IDataSourcesService, OnApplicationBootstrap
{
  reviews: IReviewsRepository<Review>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  onApplicationBootstrap() {
    // this.reviews = new PostgresGenericRepository<Review>(this.reviewRepository);
  }
}
