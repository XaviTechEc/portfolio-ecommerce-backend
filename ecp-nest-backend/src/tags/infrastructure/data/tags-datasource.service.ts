import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { ITagsDataSourceService } from 'src/tags/domain/abstracts/services/tags-datasource.abstract.service';
import { Repository } from 'typeorm';
import { Tag } from './postgresql/entities/Tag.entity';
import { TagsPostgresRepository } from './postgresql/repositories/tags.repository';

@Injectable()
export class TagsDataService
  implements ITagsDataSourceService, OnApplicationBootstrap
{
  tags: TagsPostgresRepository<Tag>;

  constructor(
    @InjectRepository(Tag)
    private _repository: Repository<Tag>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.tags = new TagsPostgresRepository<Tag>(
      this._repository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'tag',
    );
  }
}
