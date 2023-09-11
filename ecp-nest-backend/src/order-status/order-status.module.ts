import { Module } from '@nestjs/common';
import { OrderStatusFactoryService } from './application/use-cases/factory/order-status-factory.service';
import { OrderStatusUseCases } from './application/use-cases/order-status-use-cases';
import { OrderStatusDataSourceModule } from './infrastructure/data/order-status-datasource.module';
import { OrderStatusResolver } from './interface-adapters/resolvers/order-status.resolver';

@Module({
  imports: [OrderStatusDataSourceModule],
  providers: [
    OrderStatusFactoryService,
    OrderStatusUseCases,
    OrderStatusResolver,
  ],
})
export class OrderStatusModule {}
