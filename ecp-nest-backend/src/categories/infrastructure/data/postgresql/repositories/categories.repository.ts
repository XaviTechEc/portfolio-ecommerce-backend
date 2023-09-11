import { ICategoriesRepository } from 'src/categories/domain/abstracts/repositories/categories.repository';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/domain/dtos/graphql/inputs/category.input';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Category } from '../entities/Category.entity';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';

export class CategoriesRepository implements ICategoriesRepository<Category> {
  private _repository: Repository<Category>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Category>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getCategoriesBy(
    term: string,
    fields: (keyof Category)[],
    paginationArgs: PaginationArgs,
  ): Promise<Category[]> {
    let queryOptions: FindManyOptions<Category> = {};
    let relations: FindOptionsRelations<Category> = {};
    let where: FindOptionsWhere<Category> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    for (const field of fields) {
      if (field === 'season') {
        relations = { ...relations, season: true };
        where = {
          ...where,
          season: [{ description: ILike(`%${term}%`) }, { id: term }],
        };
      }

      if (field === 'parentCategory') {
        relations = { ...relations, category: true };
        where = {
          ...where,
          category: [
            { value: ILike(`%${term}%`) },
            { description: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'user') {
        relations = { ...relations, user: true };
        where = {
          ...where,
          user: [
            { username: ILike(`%${term}%`) },
            { email: ILike(`%${term}%`) },
            { fullName: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const categoriesBy = await this._repository.find(queryOptions);
    return categoriesBy;
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
        const { searchTerm } = searchArgs;

        qb = qb
          .where('category.value ILIKE LOWER(:value)')
          .orWhere('category.description ILIKE LOWER(:description)')
          .setParameters({
            value: `%${searchTerm}%`,
            description: `%${searchTerm}%`,
          });
      }
    }
    const categories = await qb.getMany();
    return categories;
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
