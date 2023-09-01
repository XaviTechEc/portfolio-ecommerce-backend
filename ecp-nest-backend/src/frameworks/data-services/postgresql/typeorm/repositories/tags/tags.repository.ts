import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ITagsRepository } from 'src/core/abstracts/repositories';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class TagsRepository<T> implements ITagsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllTags(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getTagById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createTag(createTagInput: CreateTagInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateTag(id: string, updateTagInput: UpdateTagInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeTag(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
