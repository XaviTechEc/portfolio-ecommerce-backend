import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IShoppingCartsRepository } from 'src/shopping-carts/domain/abstracts/repositories/shopping-carts.repository';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/shopping-carts/domain/dtos/graphql/inputs/shopping-cart.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ShoppingCart } from '../entities/ShoppingCart.entity';

const CONTEXT = 'ShoppingCartsRepository';

export class ShoppingCartsRepository
  implements IShoppingCartsRepository<ShoppingCart>
{
  private _repository: Repository<ShoppingCart>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ShoppingCart>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getShoppingCartsBy(
    term: string,
    fields: (keyof ShoppingCart)[],
    paginationArgs: PaginationArgs,
  ): Promise<ShoppingCart[]> {
    try {
      let queryOptions: FindManyOptions<ShoppingCart> = {};
      let relations: FindOptionsRelations<ShoppingCart> = {};
      let where: FindOptionsWhere<ShoppingCart> = {};

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

      const shoppingCartsBy = (await this._repository.find(queryOptions)) ?? [];
      return shoppingCartsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllShoppingCarts(
    args: IGenericArgs<ShoppingCart>,
  ): Promise<ShoppingCart[]> {
    try {
      let queryOptions: FindManyOptions<ShoppingCart> = {};

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          queryOptions = { take: limit, skip: offset };
        }
      }

      const shippingMethods = (await this._repository.find(queryOptions)) ?? [];
      return shippingMethods;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getShoppingCartById(id: string): Promise<ShoppingCart> {
    try {
      const shoppingCartFound = await this._repository.findOneBy({ id });
      if (!shoppingCartFound) {
        return this._exceptionsService.notFound({
          message: `The shopping cart with id ${id} could not be found`,
        });
      }
      return shoppingCartFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<ShoppingCart> {
    try {
      const newShoppingCart = await this._repository.create({
        ...createShoppingCartInput,
      });
      return this._repository.save(newShoppingCart);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<ShoppingCart> {
    try {
      await this.getShoppingCartById(id);
      const newShoppingCart = await this._repository.preload({
        ...updateShoppingCartInput,
      });
      return this._repository.save(newShoppingCart);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeShoppingCart(id: string): Promise<ShoppingCart> {
    try {
      const shoppingCart = await this.getShoppingCartById(id);
      return this._repository.remove(shoppingCart);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
