import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationOptionFactoryService } from './application/use-cases/factory/variation-option-factory.service';
import { VariationOptionUseCases } from './application/use-cases/variation-option-use-cases';
import { VariationOptionsDataSourceModule } from './infrastructure/data/variation-options-datasource.module';
import { VariationOptionResolver } from './interface-adapters/resolvers/variation-option.resolver';

@Module({
  imports: [VariationOptionsDataSourceModule],
  providers: [
    VariationOptionFactoryService,
    VariationOptionUseCases,
    VariationOptionResolver,
  ],
  exports: [TypeOrmModule],
})
export class VariationOptionsModule {}
