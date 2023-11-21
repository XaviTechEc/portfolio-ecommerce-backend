import { Module } from '@nestjs/common';
import { StoreFactoryService } from './application/use-cases/store-factory.service';
import { StoreUseCases } from './application/use-cases/store-use-cases';
import { StoresDataSourceModule } from './infrastructure/data/stores-datasource.module';
import { StoreResolver } from './interface-adapters/graphql/resolvers/store.resolver';

@Module({
  imports: [StoresDataSourceModule],
  providers: [StoreFactoryService, StoreUseCases, StoreResolver],
})
export class StoresModule {}
