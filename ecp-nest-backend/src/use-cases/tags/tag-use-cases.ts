import { Injectable } from '@nestjs/common';
import { ITagsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { ITag } from 'src/core/entities';
import { TagFactoryService } from './tag-factory.service';

@Injectable()
export class TagUseCases implements ITagsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private tagFactoryService: TagFactoryService,
  ) {}
  getAllTags(): Promise<ITag[]> {
    return this.dataService.tags.getAll();
  }
  getTagById(id: string): Promise<ITag> {
    return this.dataService.tags.getOneById(id);
  }
  createTag(createTagInput: CreateTagInput): Promise<ITag> {
    const tag = this.tagFactoryService.createTag(createTagInput);
    return this.dataService.tags.create(tag);
  }
  updateTag(id: string, updateTagInput: UpdateTagInput): Promise<ITag> {
    const tag = this.tagFactoryService.updateTag(updateTagInput);
    return this.dataService.tags.updateOneById(id, tag);
  }
  removeTag(id: string): Promise<ITag> {
    return this.dataService.tags.deleteOneById(id);
  }
}
