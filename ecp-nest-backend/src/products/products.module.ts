import { Module } from '@nestjs/common';
import { ProductFactoryService } from './application/use-cases/factory/product-factory.service';
import { ProductUseCases } from './application/use-cases/product-use-cases';
import { ProductsDataSourceModule } from './infrastructure/data/products-datasource.module';
import { ProductResolver } from './interface-adapters/graphql/resolvers/product.resolver';
import { ProductTagsModule } from 'src/product-tags/product-tags.module';
import { ProductPromotionsModule } from 'src/product-promotions/product-promotions.module';

@Module({
  imports: [
    ProductsDataSourceModule,
    ProductTagsModule,
    ProductPromotionsModule,
  ],
  providers: [ProductFactoryService, ProductUseCases, ProductResolver],
})
export class ProductsModule {}
