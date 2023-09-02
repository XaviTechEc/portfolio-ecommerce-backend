import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { ShopOrder } from '../../entities/outputs/entities';

export class ShopOrdersRepository implements IShopOrdersRepository<ShopOrder> {
  private _repository: Repository<ShopOrder>;

  constructor(repository: Repository<ShopOrder>) {
    this._repository = repository;
  }
  getAllShopOrders(args?: IGenericArgs<ShopOrder>): Promise<ShopOrder[]> {
    throw new Error('Method not implemented.');
  }
  getAllShopOrdersBy(
    fields: Partial<ShopOrder>,
    args?: IGenericArgs<ShopOrder>,
  ): Promise<ShopOrder[]> {
    throw new Error('Method not implemented.');
  }
  getShopOrderById(id: string): Promise<ShopOrder> {
    throw new Error('Method not implemented.');
  }
  getOneShopOrderBy(
    fields: Partial<ShopOrder>,
    args?: IGenericArgs<ShopOrder>,
  ): Promise<ShopOrder> {
    throw new Error('Method not implemented.');
  }
  createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<ShopOrder> {
    throw new Error('Method not implemented.');
  }
  updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<ShopOrder> {
    throw new Error('Method not implemented.');
  }
  removeShopOrder(id: string): Promise<ShopOrder> {
    throw new Error('Method not implemented.');
  }
}
