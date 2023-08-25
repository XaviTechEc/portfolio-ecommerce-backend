import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { ITag } from 'src/core/entities';

export abstract class ITagsRepository {
  abstract getAllTags(): Promise<ITag[]>;
  abstract getTagById(id: string): Promise<ITag>;
  abstract createTag(createTagInput: CreateTagInput): Promise<ITag>;
  abstract updateTag(id: string, updateTagInput: UpdateTagInput): Promise<ITag>;
  abstract removeTag(id: string): Promise<ITag>;
}
