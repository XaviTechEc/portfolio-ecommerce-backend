import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './infrastructure/data/postgresql/entities/Season.entity';
import { SeasonFactoryService } from './application/use-cases/factory/season-factory.service';
import { SeasonUseCases } from './application/use-cases/season-use-cases';
import { SeasonResolver } from './interface-adapters/resolvers/season.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Season])],
  providers: [SeasonFactoryService, SeasonUseCases, SeasonResolver],
  exports: [TypeOrmModule],
})
export class SeasonsModule {}
