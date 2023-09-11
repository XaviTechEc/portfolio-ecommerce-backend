import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethod } from './infrastructure/data/postgresql/entities/ShippingMethod.entity';
import { ShippingMethodFactoryService } from './application/use-cases/factory/shipping-method-factory.service';
import { ShippingMethodUseCases } from './application/use-cases/shipping-method-use-cases';
import { ShippingMethodResolver } from './interface-adapters/resolvers/shipping-method.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingMethod])],
  providers: [
    ShippingMethodFactoryService,
    ShippingMethodUseCases,
    ShippingMethodResolver,
  ],
  exports: [TypeOrmModule],
})
export class ShippingMethodsModule {}
