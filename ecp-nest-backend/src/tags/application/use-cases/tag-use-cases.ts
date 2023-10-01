import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { ITagsDataSourceService } from 'src/tags/domain/abstracts/services/tags-datasource.abstract.service';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { ITag } from 'src/tags/domain/entities/tag.entity';
import { TagFactoryService } from './factory/tag-factory.service';

@Injectable()
export class TagUseCases {
  constructor(
    private dataService: ITagsDataSourceService,
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
