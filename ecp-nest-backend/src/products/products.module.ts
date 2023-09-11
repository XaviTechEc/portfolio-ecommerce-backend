import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './infrastructure/data/postgresql/entities/Product.entity';
import { ProductFactoryService } from './application/use-cases/factory/product-factory.service';
import { ProductUseCases } from './application/use-cases/factory/product-use-cases';
import { ProductResolver } from './interface-adapters/resolvers/product.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductFactoryService, ProductUseCases, ProductResolver],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
