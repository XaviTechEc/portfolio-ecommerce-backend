import { Module } from '@nestjs/common';
import { CategoryUseCases } from './application/use-cases/category-use-cases';
import { CategoryFactoryService } from './application/use-cases/factory/category-factory.service';
import { CategoryDataSourceModule } from './infrastructure/data/category-datasource.module';
import { CategoryResolver } from './interface-adapters/graphql/resolvers/category.resolver';
import { ProductCategoriesModule } from 'src/product-categories/product-categories.module';
import { CategoryPromotionsModule } from 'src/category-promotions/category-promotions.module';
import { StoresModule } from 'src/stores/stores.module';
import { SeasonsModule } from 'src/seasons/seasons.module';

@Module({
  imports: [
    CategoryDataSourceModule,
    ProductCategoriesModule,
    CategoryPromotionsModule,
    SeasonsModule,
    StoresModule,
  ],
  providers: [CategoryFactoryService, CategoryUseCases, CategoryResolver],
  exports: [CategoryFactoryService, CategoryUseCases],
})
export class CategoriesModule {}
