import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './infrastructure/data/postgresql/entities/ProductCategory.entity';
import { ProductCategoryFactoryService } from './application/use-cases/factory/product-category-factory.service';
import { ProductCategoryUseCases } from './application/use-cases/product-category-use-cases';
import { ProductCategoryResolver } from './interface-adapters/resolvers/product-category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [
    ProductCategoryFactoryService,
    ProductCategoryUseCases,
    ProductCategoryResolver,
  ],
  exports: [TypeOrmModule],
})
export class ProductCategoriesModule {}
