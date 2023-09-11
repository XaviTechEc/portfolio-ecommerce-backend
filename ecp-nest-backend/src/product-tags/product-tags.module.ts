import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from './infrastructure/data/postgresql/entities/ProductTag.entity';
import { ProductTagFactoryService } from './application/use-cases/factory/product-tag-factory.service';
import { ProductTagUseCases } from './application/use-cases/product-tag-use-cases';
import { ProductTagResolver } from './interface-adapters/resolvers/product-tag.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTag])],
  providers: [ProductTagFactoryService, ProductTagUseCases, ProductTagResolver],
  exports: [TypeOrmModule],
})
export class ProductTagsModule {}
