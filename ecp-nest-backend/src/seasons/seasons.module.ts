import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonFactoryService } from './application/use-cases/factory/season-factory.service';
import { SeasonUseCases } from './application/use-cases/season-use-cases';
import { SeasonsDataSourceModule } from './infrastructure/data/seasons-datasource.module';
import { SeasonResolver } from './interface-adapters/resolvers/season.resolver';

@Module({
  imports: [SeasonsDataSourceModule],
  providers: [SeasonFactoryService, SeasonUseCases, SeasonResolver],
  exports: [TypeOrmModule],
})
export class SeasonsModule {}
