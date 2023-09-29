import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IShoppingCartProductItemRepository } from 'src/shopping-cart-product-items/domain/abstracts/repositories/shopping-cart-product-item.repository';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/shopping-cart-product-items/domain/dtos/graphql/inputs/shopping-cart-product-item.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ShoppingCartProductItem } from '../entities/ShoppingCartProductItem.entity';

const CONTEXT = 'ShoppingCartProductItemsRepository';

export class ShoppingCartProductItemsRepository
  implements IShoppingCartProductItemRepository<ShoppingCartProductItem>
{
  private _repository: Repository<ShoppingCartProductItem>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ShoppingCartProductItem>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getShoppingCartProductItemsBy(
    term: string,
    fields: (keyof ShoppingCartProductItem)[],
    paginationArgs: PaginationArgs,
  ): Promise<ShoppingCartProductItem[]> {
    try {
      let queryOptions: FindManyOptions<ShoppingCartProductItem> = {};
      let relations: FindOptionsRelations<ShoppingCartProductItem> = {};
      let where: FindOptionsWhere<ShoppingCartProductItem> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'shoppingCart') {
          relations = { ...relations, shoppingCart: true };
          where = {
            ...where,
            shoppingCart: [{ id: term }],
          };
        }

        if (field === 'productItem') {
          relations = { ...relations, productItem: true };
          where = {
            ...where,
            productItem: [
              { sku: ILike(`%${term}%`) },
              { slug: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const shoppingCartProductItemsBy =
        (await this._repository.find(queryOptions)) ?? [];
      return shoppingCartProductItemsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllShoppingCartProductItem(
    args?: IGenericArgs<ShoppingCartProductItem>,
  ): Promise<ShoppingCartProductItem[]> {
    try {
      let qb = this._repository.createQueryBuilder('shoppingCartPI');

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }
      }

      const shoppingCartPIs = (await qb.getMany()) ?? [];
      return shoppingCartPIs;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getShoppingCartProductItemById(
    id: string,
  ): Promise<ShoppingCartProductItem> {
    try {
      const shoppingCartProductItemFound = await this._repository.findOneBy({
        id,
      });
      if (!shoppingCartProductItemFound) {
        return this._exceptionsService.notFound({
          message: `The shoppingCartProductItem with id ${id} could not be found`,
        });
      }
      return shoppingCartProductItemFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<ShoppingCartProductItem> {
    try {
      const newShoppingCartProductItem = this._repository.create({
        ...createShoppingCartProductItemInput,
      });
      return this._repository.save(newShoppingCartProductItem);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateShoppingCartProductItem(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<ShoppingCartProductItem> {
    try {
      await this.getShoppingCartProductItemById(id);
      const newShoppingCartProductItem = await this._repository.preload({
        ...updateShoppingCartProductItemInput,
      });
      return this._repository.save(newShoppingCartProductItem);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeShoppingCartProductItem(
    id: string,
  ): Promise<ShoppingCartProductItem> {
    try {
      const shoppingCartProductItem =
        await this.getShoppingCartProductItemById(id);
      return this._repository.remove(shoppingCartProductItem);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
