import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationOption } from './infrastructure/data/postgresql/entities/VariationOption.entity';
import { VariationOptionFactoryService } from './application/use-cases/factory/variation-option-factory.service';
import { VariationOptionUseCases } from './application/use-cases/variation-option-use-cases';
import { VariationOptionResolver } from './interface-adapters/resolvers/variation-option.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([VariationOption])],
  providers: [
    VariationOptionFactoryService,
    VariationOptionUseCases,
    VariationOptionResolver,
  ],
  exports: [TypeOrmModule],
})
export class VariationOptionsModule {}
