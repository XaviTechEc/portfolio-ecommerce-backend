import { Injectable } from '@nestjs/common';
import { ITagsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { ITag } from 'src/core/entities';
import { TagFactoryService } from './tag-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class TagUseCases implements ITagsRepository<ITag> {
  constructor(
    private dataService: IDataSourcesService,
    private tagFactoryService: TagFactoryService,
  ) {}
  getAllTags(args?: IGenericArgs<ITag>): Promise<ITag[]> {
    throw new Error('Method not implemented.');
  }
  getTagById(id: string): Promise<ITag> {
    throw new Error('Method not implemented.');
  }
  createTag(createTagInput: CreateTagInput): Promise<ITag> {
    throw new Error('Method not implemented.');
  }
  updateTag(id: string, updateTagInput: UpdateTagInput): Promise<ITag> {
    throw new Error('Method not implemented.');
  }
  removeTag(id: string): Promise<ITag> {
    throw new Error('Method not implemented.');
  }
}
