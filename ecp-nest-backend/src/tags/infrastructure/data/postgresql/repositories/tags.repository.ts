import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ITagsRepository } from 'src/tags/domain/abstracts/repositories/tags.repository';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { Repository } from 'typeorm';
import { Tag } from '../entities/Tag.entity';

const CONTEXT = 'TagsRepository';

export class TagsRepository implements ITagsRepository<Tag> {
  private _repository: Repository<Tag>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Tag>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllTags(args?: IGenericArgs<Tag>): Promise<Tag[]> {
    try {
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

      const seasons = (await qb.getMany()) ?? [];
      return seasons;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getTagById(id: string): Promise<Tag> {
    try {
      const tagFound = await this._repository.findOneBy({ id });
      if (!tagFound) {
        return this._exceptionsService.notFound({
          message: `The tag with id ${id} could not be found`,
        });
      }
      return tagFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createTag(createTagInput: CreateTagInput): Promise<Tag> {
    try {
      const newTag = this._repository.create({ ...createTagInput });
      return this._repository.save(newTag);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateTag(id: string, updateTagInput: UpdateTagInput): Promise<Tag> {
    try {
      await this.getTagById(id);
      const newTag = await this._repository.preload({
        ...updateTagInput,
      });
      return this._repository.save(newTag);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeTag(id: string): Promise<Tag> {
    try {
      const tag = await this.getTagById(id);
      return this._repository.remove(tag);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
