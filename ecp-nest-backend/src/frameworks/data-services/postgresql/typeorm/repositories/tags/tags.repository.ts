import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ITagsRepository } from 'src/core/abstracts/repositories';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/outputs/entities';

export class TagsRepository implements ITagsRepository<Tag> {
  private _repository: Repository<Tag>;

  constructor(repository: Repository<Tag>) {
    this._repository = repository;
  }
  getAllTags(args?: IGenericArgs<Tag>): Promise<Tag[]> {
    throw new Error('Method not implemented.');
  }
  getTagById(id: string): Promise<Tag> {
    throw new Error('Method not implemented.');
  }
  createTag(createTagInput: CreateTagInput): Promise<Tag> {
    throw new Error('Method not implemented.');
  }
  updateTag(id: string, updateTagInput: UpdateTagInput): Promise<Tag> {
    throw new Error('Method not implemented.');
  }
  removeTag(id: string): Promise<Tag> {
    throw new Error('Method not implemented.');
  }
}
