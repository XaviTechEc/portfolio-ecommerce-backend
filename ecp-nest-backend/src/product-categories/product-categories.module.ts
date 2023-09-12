import { Module } from '@nestjs/common';
import { ProductCategoryFactoryService } from './application/use-cases/factory/product-category-factory.service';
import { ProductCategoryUseCases } from './application/use-cases/product-category-use-cases';
import { ProductCategoriesDataSourceModule } from './infrastructure/data/product-categories-datasource.module';
import { ProductCategoryResolver } from './interface-adapters/resolvers/product-category.resolver';

@Module({
  imports: [ProductCategoriesDataSourceModule],
  providers: [
    ProductCategoryFactoryService,
    ProductCategoryUseCases,
    ProductCategoryResolver,
  ],
  exports: [ProductCategoryFactoryService, ProductCategoryUseCases],
})
export class ProductCategoriesModule {}
