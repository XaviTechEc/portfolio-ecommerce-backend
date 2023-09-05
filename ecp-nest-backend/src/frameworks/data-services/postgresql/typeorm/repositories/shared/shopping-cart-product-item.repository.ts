import { IShoppingCartProductItemRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ShoppingCartProductItem } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ShoppingCartProductItemsRepository
  implements IShoppingCartProductItemRepository<ShoppingCartProductItem>
{
  private _repository: Repository<ShoppingCartProductItem>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ShoppingCartProductItem>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllShoppingCartProductItem(
    args?: IGenericArgs<ShoppingCartProductItem>,
  ): Promise<ShoppingCartProductItem[]> {
    let qb = this._repository.createQueryBuilder('shoppingCartPI');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const shoppingCartPIs = await qb.getMany();
    return shoppingCartPIs;
  }

  async getShoppingCartProductItemById(
    id: string,
  ): Promise<ShoppingCartProductItem> {
    const shoppingCartProductItemFound = await this._repository.findOneBy({
      id,
    });
    if (!shoppingCartProductItemFound) {
      return this._exceptionsService.notFound({
        message: `The shoppingCartProductItem with id ${id} could not be found`,
      });
    }
    return this._repository.save(shoppingCartProductItemFound);
  }

  async createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<ShoppingCartProductItem> {
    const newShoppingCartProductItem = this._repository.create({
      ...createShoppingCartProductItemInput,
    });
    return newShoppingCartProductItem;
  }

  async updateShoppingCartProductItem(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<ShoppingCartProductItem> {
    await this.getShoppingCartProductItemById(id);
    const newShoppingCartProductItem = await this._repository.preload({
      ...updateShoppingCartProductItemInput,
    });
    if (!newShoppingCartProductItem) {
      return this._exceptionsService.notFound({
        message: 'The ShoppingCartProductItem could not be preloaded',
      });
    }
    return this._repository.save(newShoppingCartProductItem);
  }

  async removeShoppingCartProductItem(
    id: string,
  ): Promise<ShoppingCartProductItem> {
    const shoppingCartProductItem =
      await this.getShoppingCartProductItemById(id);
    return this._repository.remove(shoppingCartProductItem);
  }
}
