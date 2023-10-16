import { Module } from '@nestjs/common';
import { StoresDataSourceModule } from './infrastructure/data/stores-datasource.module';
import { StoreFactoryService } from './application/use-cases/store-factory.service';
import { StoreUseCases } from './application/use-cases/store-use-cases';
import { StoreResolver } from './interface-adapters/resolvers/store.resolver';
import { BillboardsModule } from 'src/billboard/billboards.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [StoresDataSourceModule, BillboardsModule, CategoriesModule],
  providers: [StoreFactoryService, StoreUseCases, StoreResolver],
})
export class StoresModule {}
