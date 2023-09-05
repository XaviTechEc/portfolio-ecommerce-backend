import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ITagsRepository } from 'src/core/abstracts/repositories';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class TagsRepository implements ITagsRepository<Tag> {
  private _repository: Repository<Tag>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Tag>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAllTags(args?: IGenericArgs<Tag>): Promise<Tag[]> {
    let qb = this._repository.createQueryBuilder('tag');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb
          .where(`code ILIKE LOWER(:code)`)
          .orWhere('value ILIKE LOWER(:value)')
          .setParameters({
            code: `%${searchTerm}%`,
            value: `%${searchTerm}%`,
          });
      }
    }

    const seasons = await qb.getMany();
    return seasons;
  }
  async getTagById(id: string): Promise<Tag> {
    const tagFound = await this._repository.findOneBy({ id });
    if (!tagFound) {
      return this._exceptionsService.notFound({
        message: `The tag with id ${id} could not be found`,
      });
    }
    return this._repository.save(tagFound);
  }
  async createTag(createTagInput: CreateTagInput): Promise<Tag> {
    const newTag = this._repository.create({ ...createTagInput });
    return newTag;
  }
  async updateTag(id: string, updateTagInput: UpdateTagInput): Promise<Tag> {
    await this.getTagById(id);
    const newTag = await this._repository.preload({
      ...updateTagInput,
    });
    if (!newTag) {
      return this._exceptionsService.notFound({
        message: 'The Tag could not be preloaded',
      });
    }
    return this._repository.save(newTag);
  }
  async removeTag(id: string): Promise<Tag> {
    const tag = await this.getTagById(id);
    return this._repository.remove(tag);
  }
}
