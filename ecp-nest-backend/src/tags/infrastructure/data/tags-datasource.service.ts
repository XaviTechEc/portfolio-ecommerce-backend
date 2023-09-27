import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { Tag } from './postgresql/entities/Tag.entity';
import { TagsRepository } from './postgresql/repositories/tags.repository';
import { ITagsDataSourceService } from 'src/tags/domain/abstracts/services/tags-datasource.abstract.service';

@Injectable()
export class TagsDataService
  implements ITagsDataSourceService, OnApplicationBootstrap
{
  tags: TagsRepository;

  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,

    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.tags = new TagsRepository(
      this.tagsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
