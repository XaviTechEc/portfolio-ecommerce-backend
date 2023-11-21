import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IShoppingCartProductItemsDataSourceService } from 'src/shopping-cart-product-items/domain/abstracts/services/shopping-cart-product-items-datasource.abstract.service';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/shopping-cart-product-items/domain/dtos/graphql/inputs/shopping-cart-product-item.input';
import { IShoppingCartProductItem } from 'src/shopping-cart-product-items/domain/entities/shopping-cart-product-item.entity';
import { ShoppingCartProductItemFactoryService } from './factory/shopping-cart-product-item-factory.service';

@Injectable()
export class ShoppingCartProductItemUseCases {
  constructor(
    private dataServices: IShoppingCartProductItemsDataSourceService,
    private shoppingCartProductItemFactoryService: ShoppingCartProductItemFactoryService,
  ) {}

  getMany(props: GetManyProps<IShoppingCartProductItem>) {
    return this.dataServices.shoppingCartProductItems.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.shoppingCartProductItems.getOneById({ ...props });
  }

  create(props: CreateProps<CreateShoppingCartProductItemInput>) {
    const newShoppingCartProductItem =
      this.shoppingCartProductItemFactoryService.createShoppingCartProductItem(
        props.data,
      );
    return this.dataServices.shoppingCartProductItems.create({
      ...props,
      data: newShoppingCartProductItem,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateShoppingCartProductItemInput>) {
    const newShoppingCartProductItem =
      this.shoppingCartProductItemFactoryService.updateShoppingCartProductItem(
        props.data,
      );
    return this.dataServices.shoppingCartProductItems.updateOneById({
      ...props,
      data: newShoppingCartProductItem,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.shoppingCartProductItems.deleteOneById({
      ...props,
    });
  }
}
