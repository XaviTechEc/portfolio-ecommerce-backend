import { ITag } from 'src/core/entities';

export abstract class ITagsRepository {
  abstract getAllTags(): Promise<ITag[]>;
  abstract getTagById(id: string): Promise<ITag>;
  abstract createTag(createTagInput: any): Promise<ITag>;
  abstract updateTag(updateTagInput: any): Promise<ITag>;
  abstract removeTag(id: string): Promise<ITag>;
}
