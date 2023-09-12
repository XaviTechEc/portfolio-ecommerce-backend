import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { IProductTagRepository } from 'src/product-tags/domain/abstracts/repositories/product-tag.repository';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/product-tags/domain/dtos/graphql/inputs/product-tag.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ProductTag } from '../entities/ProductTag.entity';

export class ProductTagsRepository
  implements IProductTagRepository<ProductTag>
{
  private _repository: Repository<ProductTag>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductTag>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getProductTagsBy(
    term: string,
    fields: (keyof ProductTag)[],
    paginationArgs: PaginationArgs,
  ): Promise<ProductTag[]> {
    let queryOptions: FindManyOptions<ProductTag> = {};
    let relations: FindOptionsRelations<ProductTag> = {};
    let where: FindOptionsWhere<ProductTag> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    for (const field of fields) {
      if (field === 'product') {
        relations = { ...relations, product: true };
        where = {
          ...where,
          product: [
            { title: ILike(`%${term}%`) },
            { subtitle: ILike(`%${term}%`) },
            { description: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'tag') {
        relations = { ...relations, tag: true };
        where = {
          ...where,
          tag: [
            { code: ILike(`%${term}%`) },
            { value: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const productTagsBy = await this._repository.find(queryOptions);
    return productTagsBy;
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
