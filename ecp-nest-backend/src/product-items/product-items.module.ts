import { Module } from '@nestjs/common';
import { ProductItemFactoryService } from './application/use-cases/factory/product-item-factory.service';
import { ProductItemUseCases } from './application/use-cases/product-item-use-cases';
import { ProductItemsDataSourceModule } from './infrastructure/data/product-items-datasource.module';
import { ProductItemResolver } from './interface-adapters/graphql/resolvers/product-item.resolver';
import { ProductConfigurationsModule } from 'src/product-configurations/product-configurations.module';

@Module({
  imports: [ProductItemsDataSourceModule, ProductConfigurationsModule],
  providers: [
    ProductItemFactoryService,
    ProductItemUseCases,
    ProductItemResolver,
  ],
})
export class ProductItemsModule {}
