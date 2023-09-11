import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTagFactoryService } from './application/use-cases/factory/product-tag-factory.service';
import { ProductTagUseCases } from './application/use-cases/product-tag-use-cases';
import { ProductTagResolver } from './interface-adapters/resolvers/product-tag.resolver';
import { ProductTagsDataSourceModule } from './infrastructure/data/product-tags-datasource.module';

@Module({
  imports: [ProductTagsDataSourceModule],
  providers: [ProductTagFactoryService, ProductTagUseCases, ProductTagResolver],
  exports: [TypeOrmModule],
})
export class ProductTagsModule {}
