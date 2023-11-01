import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateTagInput,
  UpdateTagInput,
} from '../../dtos/graphql/inputs/tag.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class ITagsRepository<T> {
  abstract getAllTags(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getTagById(id: string): Promise<T>;
  abstract createTag(createTagInput: CreateTagInput): Promise<T>;
  abstract updateTag(id: string, updateTagInput: UpdateTagInput): Promise<T>;
  abstract removeTag(id: string): Promise<T>;
}
