import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
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

const CONTEXT = 'ProductTagRepository';

export class ProductTagsRepository
  implements IProductTagRepository<ProductTag>
{
  private _repository: Repository<ProductTag>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ProductTag>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
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
    try {
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

      const productTagsBy = (await this._repository.find(queryOptions)) ?? [];
      return productTagsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllProductTag(
    args?: IGenericArgs<ProductTag>,
  ): Promise<ProductTag[]> {
    try {
      let qb = this._repository.createQueryBuilder('productTag');

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }
      }

      const productTags = (await qb.getMany()) ?? [];
      return productTags;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getProductTagById(id: string): Promise<ProductTag> {
    try {
      const productTagFound = await this._repository.findOneBy({ id });
      if (!productTagFound) {
        return this._exceptionsService.notFound({
          message: `The productTag with id ${id} could not be found`,
        });
      }
      return productTagFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<ProductTag> {
    try {
      const newProductTag = this._repository.create({
        ...createProductTagInput,
      });
      return this._repository.save(newProductTag);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateProductTag(
    id: string,
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<ProductTag> {
    try {
      await this.getProductTagById(id);
      const newProductTag = await this._repository.preload({
        ...updateProductTagInput,
      });
      return this._repository.save(newProductTag);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeProductTag(id: string): Promise<ProductTag> {
    try {
      const productTag = await this.getProductTagById(id);
      return this._repository.remove(productTag);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
