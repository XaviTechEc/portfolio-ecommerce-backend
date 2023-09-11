import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './infrastructure/data/postgresql/entities/Category.entity';
import { CategoryUseCases } from './application/use-cases/category-use-cases';
import { CategoryResolver } from './interface-adapters/resolvers/category.resolver';
import { CategoryFactoryService } from './application/use-cases/category-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryFactoryService, CategoryUseCases, CategoryResolver],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
