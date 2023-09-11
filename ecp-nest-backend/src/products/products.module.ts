import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFactoryService } from './application/use-cases/factory/product-factory.service';
import { ProductUseCases } from './application/use-cases/product-use-cases';
import { Product } from './infrastructure/data/postgresql/entities/Product.entity';
import { ProductResolver } from './interface-adapters/resolvers/product.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductFactoryService, ProductUseCases, ProductResolver],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
