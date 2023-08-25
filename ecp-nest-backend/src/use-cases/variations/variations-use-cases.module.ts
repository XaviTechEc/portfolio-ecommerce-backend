import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import {
  VariationFactoryService,
  VariationOptionFactoryService,
} from './factory';
import { VariationUseCases } from './variation-use-cases';
import { VariationOptionUseCases } from './variation-option-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [
    VariationFactoryService,
    VariationOptionFactoryService,
    VariationUseCases,
    VariationOptionUseCases,
  ],
  providers: [
    VariationFactoryService,
    VariationOptionFactoryService,
    VariationUseCases,
    VariationOptionUseCases,
  ],
})
export class VariationsUseCasesModule {}
