import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { ITagsRepository } from 'src/tags/domain/abstracts/repositories/tags.repository';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { ITag } from 'src/tags/domain/entities/tag.entity';
import { TagFactoryService } from './factory/tag-factory.service';

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
