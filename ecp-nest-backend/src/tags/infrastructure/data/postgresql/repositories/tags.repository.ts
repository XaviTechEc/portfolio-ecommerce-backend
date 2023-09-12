import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { ITagsRepository } from 'src/tags/domain/abstracts/repositories/tags.repository';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { Repository } from 'typeorm';
import { Tag } from '../entities/Tag.entity';

export class TagsRepository implements ITagsRepository<Tag> {
  private _repository: Repository<Tag>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Tag>,
    loggerService: MyLoggerService,
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
          .where(`tag.code ILIKE LOWER(:code)`)
          .orWhere('tag.value ILIKE LOWER(:value)')
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
