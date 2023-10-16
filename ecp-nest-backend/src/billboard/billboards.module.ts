import { Module } from '@nestjs/common';
import { BillboardDataSourceModule } from './infrastructure/data/postgresql/billboard-datasource.module';
import { BillboardFactoryService } from './application/use-cases/billboard-factory.service';
import { BillboardUseCases } from './application/use-cases/billboard-use-cases';
import { BillboardResolver } from './interface-adapters/resolvers/billboard.resolver';

@Module({
  imports: [BillboardDataSourceModule],
  providers: [BillboardFactoryService, BillboardUseCases, BillboardResolver],
  exports: [BillboardFactoryService, BillboardUseCases],
})
export class BillboardsModule {}
