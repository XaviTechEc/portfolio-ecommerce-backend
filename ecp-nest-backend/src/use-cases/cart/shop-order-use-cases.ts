import { Injectable } from '@nestjs/common';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ShopOrderFactoryService } from './factory/shop-order-factory.service';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class ShopOrderUseCases implements IShopOrdersRepository<IShopOrder> {
  constructor(
    private dataService: IDataSourcesService,
    private shopOrderFactoryService: ShopOrderFactoryService,
  ) {}
  getAllShopOrders(args?: IGenericArgs<IShopOrder>): Promise<IShopOrder[]> {
    return this.dataService.shopOrders.getAllShopOrders(args);
  }

  getShopOrderById(id: string): Promise<IShopOrder> {
    return this.dataService.shopOrders.getShopOrderById(id);
  }

  createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<IShopOrder> {
    const shopOrder =
      this.shopOrderFactoryService.createShopOrder(createShopOrderInput);
    return this.dataService.shopOrders.createShopOrder(shopOrder);
  }
  updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<IShopOrder> {
    const shopOrder =
      this.shopOrderFactoryService.updateShopOrder(updateShopOrderInput);
    return this.dataService.shopOrders.updateShopOrder(id, shopOrder);
  }
  removeShopOrder(id: string): Promise<IShopOrder> {
    return this.dataService.shopOrders.removeShopOrder(id);
  }
}
