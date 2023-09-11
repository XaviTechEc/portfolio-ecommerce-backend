import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsRepository } from './postgresql/repositories/comments.repository';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Comment } from './postgresql/entities/Comment.entity';

@Injectable()
export class CommentsDataService implements OnApplicationBootstrap {
  // Comments
  comments: CommentsRepository;

  constructor(
    // Comments
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Comments
    this.comments = new CommentsRepository(
      this.commentsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
