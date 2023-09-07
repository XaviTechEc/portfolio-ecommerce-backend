import { IProductsRepository } from 'src/core/abstracts/repositories';
import {
  PaginationArgs,
  IGenericArgs,
  CreateProductInput,
  UpdateProductInput,
} from 'src/core/dtos';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Product } from '../../entities/outputs/entities';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

export class ProductsRepository implements IProductsRepository<Product> {
  private _repository: Repository<Product>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Product>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
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

    const addressesBy = await this._repository.find(queryOptions);
    return addressesBy;
  }

  async getAllProducts(args?: IGenericArgs<Product>): Promise<Product[]> {
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

    const products = await qb.getMany();

    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const productFound = await this._repository.findOneBy({ id });
    return this._repository.save(productFound);
  }

  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    const newProduct = this._repository.create({ ...createProductInput });
    return newProduct;
  }

  async updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    await this.getProductById(id);
    const newProduct = await this._repository.preload({
      ...updateProductInput,
    });
    if (!newProduct) {
      return this._exceptionsService.notFound({
        message: 'The comment could not be preloaded',
      });
    }
    return this._repository.save(newProduct);
  }

  async removeProduct(id: string): Promise<Product> {
    const product = await this.getProductById(id);
    return this._repository.remove(product);
  }
}
