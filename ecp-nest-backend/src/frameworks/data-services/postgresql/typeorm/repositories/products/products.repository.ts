import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IProductsRepository } from 'src/core/abstracts/repositories';
import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Product } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

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
          .where('title ILIKE LOWER(:title)')
          .orWhere('subtitle ILIKE LOWER(:subtitle)')
          .orWhere('description ILIKE LOWER(:description)')
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

  async getAllProductsBy(
    fields: Partial<Product>,
    args?: IGenericArgs<Product>,
  ): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  async getOneProductBy(
    fields: Partial<Product>,
    args?: IGenericArgs<Product>,
  ): Promise<Product> {
    throw new Error('Method not implemented.');
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
