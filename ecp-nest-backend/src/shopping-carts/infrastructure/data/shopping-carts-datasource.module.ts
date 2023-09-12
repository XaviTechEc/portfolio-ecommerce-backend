import { Module } from '@nestjs/common';
import { ShoppingCartsDataService } from './shopping-carts-datasource.service';
import { IShoppingCartsDataSourceService } from 'src/shopping-carts/domain/abstracts/services/shopping-carts-datasource.abstract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './postgresql/entities/ShoppingCart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  providers: [
    {
      provide: IShoppingCartsDataSourceService,
      useClass: ShoppingCartsDataService,
    },
  ],
  exports: [IShoppingCartsDataSourceService, TypeOrmModule],
})
export class ShoppingCartsDataSourceModule {}
