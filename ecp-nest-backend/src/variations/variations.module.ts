import { Module } from '@nestjs/common';
import { VariationFactoryService } from './application/use-cases/factory/variation-factory.service';
import { VariationUseCases } from './application/use-cases/variation-use-cases';
import { VariationsDataSourceModule } from './infrastructure/data/variations-datasource.module';
import { VariationResolver } from './interface-adapters/resolvers/variation.resolver';

@Module({
  imports: [VariationsDataSourceModule],
  providers: [VariationFactoryService, VariationUseCases, VariationResolver],
})
export class VariationsModule {}
