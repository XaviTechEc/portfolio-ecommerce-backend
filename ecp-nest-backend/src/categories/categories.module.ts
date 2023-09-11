import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryUseCases } from './application/use-cases/category-use-cases';
import { CategoryFactoryService } from './application/use-cases/factory/category-factory.service';
import { CategoryDatasourceModule } from './infrastructure/data/category-datasource.module';
import { CategoryResolver } from './interface-adapters/resolvers/category.resolver';

@Module({
  imports: [CategoryDatasourceModule],
  providers: [CategoryFactoryService, CategoryUseCases, CategoryResolver],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
