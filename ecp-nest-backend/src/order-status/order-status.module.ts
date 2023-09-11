import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './infrastructure/data/postgresql/entities/OrderStatus.entity';
import { OrderStatusFactoryService } from './application/use-cases/factory/order-status-factory.service';
import { OrderStatusUseCases } from './application/use-cases/order-status-use-cases';
import { OrderStatusResolver } from './interface-adapters/resolvers/order-status.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  providers: [
    OrderStatusFactoryService,
    OrderStatusUseCases,
    OrderStatusResolver,
  ],
})
export class OrderStatusModule {}
