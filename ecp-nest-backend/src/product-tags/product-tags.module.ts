import { Module } from '@nestjs/common';
import { ProductTagFactoryService } from './application/use-cases/factory/product-tag-factory.service';
import { ProductTagUseCases } from './application/use-cases/product-tag-use-cases';
import { ProductTagsDataSourceModule } from './infrastructure/data/product-tags-datasource.module';
import { ProductTagResolver } from './interface-adapters/graphql/resolvers/product-tag.resolver';

@Module({
  imports: [ProductTagsDataSourceModule],
  providers: [ProductTagFactoryService, ProductTagUseCases, ProductTagResolver],
  exports: [ProductTagFactoryService, ProductTagUseCases],
})
export class ProductTagsModule {}
