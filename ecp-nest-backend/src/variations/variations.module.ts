import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation } from './infrastructure/data/postgresql/entities/Variation.entity';
import { VariationFactoryService } from './application/use-cases/factory/variation-factory.service';
import { VariationUseCases } from './application/use-cases/variation-use-cases';
import { VariationResolver } from './interface-adapters/resolvers/variation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Variation])],
  providers: [VariationFactoryService, VariationUseCases, VariationResolver],
  exports: [TypeOrmModule],
})
export class VariationsModule {}
