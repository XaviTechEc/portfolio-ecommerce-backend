import { Injectable } from '@nestjs/common';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ShopOrderFactoryService } from './factory/shop-order-factory.service';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';

@Injectable()
export class ShopOrderUseCases implements IShopOrdersRepository {
  constructor(
    private dataService: IDataSourcesService,
    private shopOrderFactoryService: ShopOrderFactoryService,
  ) {}
  getAllShopOrders(): Promise<IShopOrder[]> {
    return this.dataService.shopOrders.getAll();
  }
  getAllShopOrdersBy(fields: Partial<IShopOrder>): Promise<IShopOrder[]> {
    return this.dataService.shopOrders.getAllBy(fields);
  }
  getShopOrderById(id: string): Promise<IShopOrder> {
    return this.dataService.shopOrders.getOneById(id);
  }
  getOneShopOrderBy(fields: Partial<IShopOrder>): Promise<IShopOrder> {
    return this.dataService.shopOrders.getOneBy(fields);
  }
  createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<IShopOrder> {
    const shopOrder =
      this.shopOrderFactoryService.createShopOrder(createShopOrderInput);
    return this.dataService.shopOrders.create(shopOrder);
  }
  updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<IShopOrder> {
    const shopOrder =
      this.shopOrderFactoryService.updateShopOrder(updateShopOrderInput);

    return this.dataService.shopOrders.updateOneById(id, shopOrder);
  }
  removeShopOrder(id: string): Promise<IShopOrder> {
    return this.dataService.shopOrders.deleteOneById(id);
  }
}
