import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLine } from './infrastructure/data/postgresql/entities/OrderLine.entity';
import { OrderLineFactoryService } from './application/use-cases/factory/order-line-factory.service';
import { OrderLineUseCases } from './application/use-cases/order-line-use-cases';
import { OrderLineResolver } from './interface-adapters/resolvers/order-line.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine])],
  providers: [OrderLineFactoryService, OrderLineUseCases, OrderLineResolver],
  exports: [TypeOrmModule],
})
export class OrderLinesModule {}
