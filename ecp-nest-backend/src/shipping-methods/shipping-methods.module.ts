import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethodFactoryService } from './application/use-cases/factory/shipping-method-factory.service';
import { ShippingMethodUseCases } from './application/use-cases/shipping-method-use-cases';
import { ShippingMethodsDataSourceModule } from './infrastructure/data/shipping-methods-datasource.module';
import { ShippingMethodResolver } from './interface-adapters/resolvers/shipping-method.resolver';

@Module({
  imports: [ShippingMethodsDataSourceModule],
  providers: [
    ShippingMethodFactoryService,
    ShippingMethodUseCases,
    ShippingMethodResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShippingMethodsModule {}
