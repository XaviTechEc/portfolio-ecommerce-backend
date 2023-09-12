import { Module } from '@nestjs/common';
import { IShoppingCartProductItemsDataSourceService } from 'src/shopping-cart-product-items/domain/abstracts/services/shopping-cart-product-items-datasource.abstract.service';
import { ShoppingCartProductItemsDataService } from './shopping-cart-product-items-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartProductItem } from './postgresql/entities/ShoppingCartProductItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartProductItem])],
  providers: [
    {
      provide: IShoppingCartProductItemsDataSourceService,
      useClass: ShoppingCartProductItemsDataService,
    },
  ],
  exports: [IShoppingCartProductItemsDataSourceService, TypeOrmModule],
})
export class ShoppingCartProductItemsDataSourceModule {}
