import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICategoriesRepository } from 'src/core/abstracts/repositories';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Category } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class CategoriesRepository implements ICategoriesRepository<Category> {
  private _repository: Repository<Category>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Category>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllCategories(args?: IGenericArgs<Category>): Promise<Category[]> {
    let qb = this._repository.createQueryBuilder('category');
    if (args) {
      const { paginationArgs, searchArgs } = args;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm, searchFields } = searchArgs;

        if (searchTerm.trim.length === 0) return;
        if (!searchFields || searchFields.length === 0) {
          return this._exceptionsService.badRequest({
            message: 'Search fields are required',
            code_error: 404,
          });
        }

        // Joins
        qb = qb
          .leftJoin('category.created_by', 'user')
          .leftJoin('category.season_id', 'season')
          .where({});

        searchFields.forEach((sf) => {
          if (sf === 'value' || sf === 'description') {
            qb = qb.andWhere(`${sf} ILIKE :term`, { term: `%${searchTerm}%` });
          }
        });
      }

      const categories = await qb.getMany();

      return categories;
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    const categoryFound = await this._repository.findOneBy({ id });
    if (!categoryFound) {
      return this._exceptionsService.notFound({
        message: `The category with id ${id} could not be found`,
      });
    }
    return categoryFound;
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const newCategory = this._repository.create({ ...createCategoryInput });
    return this._repository.save(newCategory);
  }

  async updateCategory(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    await this.getCategoryById(id);
    const newCategory = await this._repository.preload({
      ...updateCategoryInput,
    });
    if (!newCategory) {
      return this._exceptionsService.notFound({
        message: 'The category could not be preloaded',
      });
    }
    return this._repository.save(newCategory);
  }

  async removeCategory(id: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    return this._repository.remove(category);
  }
}
