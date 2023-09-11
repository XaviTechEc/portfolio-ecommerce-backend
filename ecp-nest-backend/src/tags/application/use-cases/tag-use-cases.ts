import { Injectable } from '@nestjs/common';
import { ITagsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { ITag } from 'src/core/entities';
import { TagFactoryService } from './tag-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class TagUseCases implements ITagsRepository<ITag> {
  constructor(
    private dataService: IDataSourcesService,
    private tagFactoryService: TagFactoryService,
  ) {}
  getAllTags(args?: IGenericArgs<ITag>): Promise<ITag[]> {
    return this.dataService.tags.getAllTags(args);
  }
  getTagById(id: string): Promise<ITag> {
    return this.dataService.tags.getTagById(id);
  }
  createTag(createTagInput: CreateTagInput): Promise<ITag> {
    const tag = this.tagFactoryService.createTag(createTagInput);
    return this.dataService.tags.createTag(tag);
  }
  updateTag(id: string, updateTagInput: UpdateTagInput): Promise<ITag> {
    const tag = this.tagFactoryService.updateTag(updateTagInput);
    return this.dataService.tags.updateTag(id, tag);
  }
  removeTag(id: string): Promise<ITag> {
    return this.dataService.tags.removeTag(id);
  }
}
