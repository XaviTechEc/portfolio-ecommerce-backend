import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { ProductFactoryService, ProductItemFactoryService } from './factory';
import { ProductItemUseCases } from './product-item-use-cases';
import { ProductUseCases } from './product-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [
    ProductFactoryService,
    ProductItemFactoryService,
    ProductItemUseCases,
    ProductUseCases,
  ],
  providers: [
    ProductFactoryService,
    ProductItemFactoryService,
    ProductItemUseCases,
    ProductUseCases,
  ],
})
export class ProductsUseCasesModule {}
