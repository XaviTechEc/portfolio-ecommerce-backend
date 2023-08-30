import { Injectable } from '@nestjs/common';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ShopOrderFactoryService } from './factory/shop-order-factory.service';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class ShopOrderUseCases implements IShopOrdersRepository<IShopOrder> {
  constructor(
    private dataService: IDataSourcesService,
    private shopOrderFactoryService: ShopOrderFactoryService,
  ) {}
  getAllShopOrders(args?: IGenericArgs<IShopOrder>): Promise<IShopOrder[]> {
    throw new Error('Method not implemented.');
  }
  getAllShopOrdersBy(
    fields: Partial<IShopOrder>,
    args?: IGenericArgs<IShopOrder>,
  ): Promise<IShopOrder[]> {
    throw new Error('Method not implemented.');
  }
  getShopOrderById(id: string): Promise<IShopOrder> {
    throw new Error('Method not implemented.');
  }
  getOneShopOrderBy(
    fields: Partial<IShopOrder>,
    args?: IGenericArgs<IShopOrder>,
  ): Promise<IShopOrder> {
    throw new Error('Method not implemented.');
  }
  createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<IShopOrder> {
    throw new Error('Method not implemented.');
  }
  updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<IShopOrder> {
    throw new Error('Method not implemented.');
  }
  removeShopOrder(id: string): Promise<IShopOrder> {
    throw new Error('Method not implemented.');
  }
}
