import { Module } from '@nestjs/common';
import { IShippingMethodsDataSourceService } from 'src/shipping-methods/domain/abstracts/services/shipping-methods-datasource.abstract.service';
import { ShippingMethodsDataService } from './shipping-methods-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethod } from './postgresql/entities/ShippingMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  providers: [
    {
      provide: IShippingMethodsDataSourceService,
      useClass: ShippingMethodsDataService,
    },
  ],
  exports: [IShippingMethodsDataSourceService],
})
export class ShippingMethodsDataSourceModule {}
