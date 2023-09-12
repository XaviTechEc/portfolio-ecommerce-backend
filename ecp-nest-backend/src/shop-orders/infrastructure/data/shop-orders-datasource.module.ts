import { Module } from '@nestjs/common';
import { IShopOrdersDataSourceService } from 'src/shop-orders/domain/abstracts/services/shop-orders-datasource.abstract.service';
import { ShopOrdersDataService } from './shop-orders-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrder } from './postgresql/entities/ShopOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrder])],
  providers: [
    {
      provide: IShopOrdersDataSourceService,
      useClass: ShopOrdersDataService,
    },
  ],
  exports: [IShopOrdersDataSourceService],
})
export class ShopOrdersDataSourceModule {}
