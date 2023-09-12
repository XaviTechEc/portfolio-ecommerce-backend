import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
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

export class ShoppingCartsRepository
  implements IShoppingCartsRepository<ShoppingCart>
{
  private _repository: Repository<ShoppingCart>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ShoppingCart>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
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

    const shoppingCartsBy = await this._repository.find(queryOptions);
    return shoppingCartsBy;
  }
  async getAllShoppingCarts(
    args: IGenericArgs<ShoppingCart>,
  ): Promise<ShoppingCart[]> {
    let queryOptions: FindManyOptions<ShoppingCart> = {};

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }
    }

    const shippingMethods = await this._repository.find(queryOptions);
    return shippingMethods;
  }
  async getShoppingCartById(id: string): Promise<ShoppingCart> {
    const shoppingCartFound = await this._repository.findOneBy({ id });
    if (!shoppingCartFound) {
      return this._exceptionsService.notFound({
        message: `The shopping cart with id ${id} could not be found`,
      });
    }
    return shoppingCartFound;
  }
  async createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<ShoppingCart> {
    const newShoppingCart = await this._repository.create({
      ...createShoppingCartInput,
    });
    return this._repository.save(newShoppingCart);
  }
  async updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<ShoppingCart> {
    await this.getShoppingCartById(id);
    const newShoppingCart = await this._repository.preload({
      ...updateShoppingCartInput,
    });
    if (!newShoppingCart) {
      return this._exceptionsService.notFound({
        message: 'The shopping cart could not be preloaded',
      });
    }
    return this._repository.save(newShoppingCart);
  }
  async removeShoppingCart(id: string): Promise<ShoppingCart> {
    const shoppingCart = await this.getShoppingCartById(id);
    return this._repository.remove(shoppingCart);
  }
}
