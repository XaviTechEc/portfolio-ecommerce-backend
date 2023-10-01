import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsRepository } from './postgresql/repositories/comments.repository';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
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
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.comments = new CommentsRepository(
      this.commentsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
