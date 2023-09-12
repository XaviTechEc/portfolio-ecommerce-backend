import { Module } from '@nestjs/common';
import { OrderLineFactoryService } from './application/use-cases/factory/order-line-factory.service';
import { OrderLineUseCases } from './application/use-cases/order-line-use-cases';
import { OrderLinesDataSourceModule } from './infrastructure/data/order-lines-datasource.module';
import { OrderLineResolver } from './interface-adapters/resolvers/order-line.resolver';

@Module({
  imports: [OrderLinesDataSourceModule],
  providers: [OrderLineFactoryService, OrderLineUseCases, OrderLineResolver],
})
export class OrderLinesModule {}
