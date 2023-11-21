import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IShopOrdersDataSourceService } from 'src/shop-orders/domain/abstracts/services/shop-orders-datasource.abstract.service';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from 'src/shop-orders/domain/dtos/graphql/inputs/shop-order.input';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';
import { ShopOrderFactoryService } from './factory/shop-order-factory.service';

@Injectable()
export class ShopOrderUseCases {
  constructor(
    private dataServices: IShopOrdersDataSourceService,
    private shopOrderFactoryService: ShopOrderFactoryService,
  ) {}

  getMany(props: GetManyProps<IShopOrder>) {
    return this.dataServices.shopOrders.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.shopOrders.getOneById({ ...props });
  }

  create(props: CreateProps<CreateShopOrderInput>) {
    const newShopOrder = this.shopOrderFactoryService.createShopOrder(
      props.data,
    );
    return this.dataServices.shopOrders.create({
      ...props,
      data: newShopOrder,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateShopOrderInput>) {
    const newShopOrder = this.shopOrderFactoryService.updateShopOrder(
      props.data,
    );
    return this.dataServices.shopOrders.updateOneById({
      ...props,
      data: newShopOrder,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.shopOrders.deleteOneById({ ...props });
  }
}
