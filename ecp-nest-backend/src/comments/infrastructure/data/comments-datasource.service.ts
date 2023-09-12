import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsRepository } from './postgresql/repositories/comments.repository';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Comment } from './postgresql/entities/Comment.entity';
import { ICommentsDataSourceService } from 'src/comments/domain/abstracts/services/comments-datasource.abstract.service';

@Injectable()
export class CommentsDataService
  implements ICommentsDataSourceService, OnApplicationBootstrap
{
  comments: CommentsRepository;

  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.comments = new CommentsRepository(
      this.commentsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
