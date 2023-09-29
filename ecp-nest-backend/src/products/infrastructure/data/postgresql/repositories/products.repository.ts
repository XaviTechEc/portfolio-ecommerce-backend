import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IProductsRepository } from 'src/products/domain/abstracts/repositories/product.repository';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/products/domain/dtos/graphql/inputs/product.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Product } from '../entities/Product.entity';

const CONTEXT = 'ProductsRepository';

export class ProductsRepository implements IProductsRepository<Product> {
  private _repository: Repository<Product>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Product>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getProductsBy(
    term: string,
    fields: (keyof Product)[],
    paginationArgs: PaginationArgs,
  ): Promise<Product[]> {
    try {
      let queryOptions: FindManyOptions<Product> = {};
      let relations: FindOptionsRelations<Product> = {};
      let where: FindOptionsWhere<Product> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
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

      const productsBy = (await this._repository.find(queryOptions)) ?? [];
      return productsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllProducts(args?: IGenericArgs<Product>): Promise<Product[]> {
    try {
      let qb = this._repository.createQueryBuilder('product');

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          qb = qb
            .where('product.title ILIKE LOWER(:title)')
            .orWhere('product.subtitle ILIKE LOWER(:subtitle)')
            .orWhere('product.description ILIKE LOWER(:description)')
            .setParameters({
              title: `%${searchTerm}%`,
              subtitle: `%${searchTerm}%`,
              description: `%${searchTerm}%`,
            });
        }
      }

      const products = (await qb.getMany()) ?? [];

      return products;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const productFound = await this._repository.findOneBy({ id });
      if (!productFound) {
        return this._exceptionsService.notFound({
          message: `The product with id ${id} could not be found`,
        });
      }
      return productFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    try {
      const newProduct = this._repository.create({ ...createProductInput });
      return this._repository.save(newProduct);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    try {
      await this.getProductById(id);
      const newProduct = await this._repository.preload({
        ...updateProductInput,
      });
      return this._repository.save(newProduct);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeProduct(id: string): Promise<Product> {
    try {
      const product = await this.getProductById(id);
      return this._repository.remove(product);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
