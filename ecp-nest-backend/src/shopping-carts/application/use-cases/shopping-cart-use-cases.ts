import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IShoppingCartsDataSourceService } from 'src/shopping-carts/domain/abstracts/services/shopping-carts-datasource.abstract.service';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/shopping-carts/domain/dtos/graphql/inputs/shopping-cart.input';
import { IShoppingCart } from 'src/shopping-carts/domain/entities/shopping-cart.entity';
import { ShoppingCartFactoryService } from './factory/shopping-cart-factory.service';

@Injectable()
export class ShoppingCartUseCases {
  constructor(
    private dataServices: IShoppingCartsDataSourceService,
    private shoppingCartFactoryService: ShoppingCartFactoryService,
  ) {}

  getMany(props: GetManyProps<IShoppingCart>) {
    return this.dataServices.shoppingCarts.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.shoppingCarts.getOneById({ ...props });
  }

  create(props: CreateProps<CreateShoppingCartInput>) {
    const newShoppingCart = this.shoppingCartFactoryService.createShoppingCart(
      props.data,
    );
    return this.dataServices.shoppingCarts.create({
      ...props,
      data: newShoppingCart,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateShoppingCartInput>) {
    const newShoppingCart = this.shoppingCartFactoryService.updateShoppingCart(
      props.data,
    );
    return this.dataServices.shoppingCarts.updateOneById({
      ...props,
      data: newShoppingCart,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.shoppingCarts.deleteOneById({ ...props });
  }
}
