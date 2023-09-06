import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShoppingCartsRepository } from 'src/core/abstracts/repositories';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { FindManyOptions, Repository } from 'typeorm';
import { ShoppingCart } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ShoppingCartsRepository
  implements IShoppingCartsRepository<ShoppingCart>
{
  private _repository: Repository<ShoppingCart>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ShoppingCart>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
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
