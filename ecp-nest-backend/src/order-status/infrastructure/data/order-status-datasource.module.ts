import { Module } from '@nestjs/common';
import { IOrderStatusDataSourceService } from 'src/order-status/domain/abstracts/services/order-status-datasource.abstract.service';
import { OrderStatusDataService } from './order-status-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './postgresql/entities/OrderStatus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  providers: [
    {
      provide: IOrderStatusDataSourceService,
      useClass: OrderStatusDataService,
    },
  ],
  exports: [],
})
export class OrderStatusDataSourceModule {}
