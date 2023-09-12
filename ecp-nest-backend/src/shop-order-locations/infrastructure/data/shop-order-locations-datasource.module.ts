import { Module } from '@nestjs/common';
import { IShopOrderLocationsDataSourceService } from 'src/shop-order-locations/domain/abstracts/services/shop-order-locations-datasource.abstract.service';
import { ShopOrderLocationsDataService } from './shop-order-locations-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrderLocation } from './postgresql/entities/ShopOrderLocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrderLocation])],
  providers: [
    {
      provide: IShopOrderLocationsDataSourceService,
      useClass: ShopOrderLocationsDataService,
    },
  ],
  exports: [IShopOrderLocationsDataSourceService, TypeOrmModule],
})
export class ShopOrderLocationsDataSourceModule {}
