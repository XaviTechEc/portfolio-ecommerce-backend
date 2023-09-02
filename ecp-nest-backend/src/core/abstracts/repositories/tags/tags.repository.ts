import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class ITagsRepository<T> {
  abstract getAllTags(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getTagById(id: string): Promise<T>;
  abstract createTag(createTagInput: CreateTagInput): Promise<T>;
  abstract updateTag(id: string, updateTagInput: UpdateTagInput): Promise<T>;
  abstract removeTag(id: string): Promise<T>;
}
