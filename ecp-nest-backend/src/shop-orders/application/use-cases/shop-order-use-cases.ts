import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IShopOrdersRepository } from 'src/shop-orders/domain/abstracts/repositories/shop-orders.repository';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from 'src/shop-orders/domain/dtos/graphql/inputs/shop-order.input';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';
import { ShopOrderFactoryService } from './factory/shop-order-factory.service';

@Injectable()
export class ShopOrderUseCases implements IShopOrdersRepository<IShopOrder> {
  constructor(
    private dataService: IDataSourcesService,
    private shopOrderFactoryService: ShopOrderFactoryService,
  ) {}
  getShopOrdersBy(
    term: string,
    fields: (keyof IShopOrder)[],
    paginationArgs: PaginationArgs,
  ): Promise<IShopOrder[]> {
    return this.dataService.shopOrders.getShopOrdersBy(
      term,
      fields,
      paginationArgs,
    );
  }
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
