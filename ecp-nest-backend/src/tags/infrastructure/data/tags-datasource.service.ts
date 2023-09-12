import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
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

    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.tags = new TagsRepository(
      this.tagsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
