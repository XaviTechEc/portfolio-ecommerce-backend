import { IProductTagRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductTag } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ProductTagsRepository
  implements IProductTagRepository<ProductTag>
{
  private _repository: Repository<ProductTag>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductTag>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllProductTag(
    args?: IGenericArgs<ProductTag>,
  ): Promise<ProductTag[]> {
    let qb = this._repository.createQueryBuilder('productTag');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const productTags = await qb.getMany();
    return productTags;
  }

  async getProductTagById(id: string): Promise<ProductTag> {
    const productTagFound = await this._repository.findOneBy({ id });
    if (!productTagFound) {
      return this._exceptionsService.notFound({
        message: `The productTag with id ${id} could not be found`,
      });
    }
    return this._repository.save(productTagFound);
  }

  async createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<ProductTag> {
    const newProductTag = this._repository.create({
      ...createProductTagInput,
    });
    return newProductTag;
  }

  async updateProductTag(
    id: string,
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<ProductTag> {
    await this.getProductTagById(id);
    const newProductTag = await this._repository.preload({
      ...updateProductTagInput,
    });
    if (!newProductTag) {
      return this._exceptionsService.notFound({
        message: 'The ProductTag could not be preloaded',
      });
    }
    return this._repository.save(newProductTag);
  }

  async removeProductTag(id: string): Promise<ProductTag> {
    const productTag = await this.getProductTagById(id);
    return this._repository.remove(productTag);
  }
}
