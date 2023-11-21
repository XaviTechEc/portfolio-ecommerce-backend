import { Module } from '@nestjs/common';
import { BillboardDataSourceModule } from './infrastructure/data/billboard-datasource.module';
import { BillboardFactoryService } from './application/use-cases/billboard-factory.service';
import { BillboardUseCases } from './application/use-cases/billboard-use-cases';
import { BillboardResolver } from './interface-adapters/graphql/resolvers/billboard.resolver';
import { StoresModule } from 'src/stores/stores.module';
import { SeasonsModule } from 'src/seasons/seasons.module';

@Module({
  imports: [BillboardDataSourceModule, StoresModule, SeasonsModule],
  providers: [BillboardFactoryService, BillboardUseCases, BillboardResolver],
  exports: [BillboardFactoryService, BillboardUseCases],
})
export class BillboardsModule {}
