import { IStoresDataSourceService } from 'src/stores/domain/abstracts/services/stores-datasource.abstract.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './postgresql/entities/Store.entity';
import { StoreDataService } from './stores-datasource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [
    {
      provide: IStoresDataSourceService,
      useClass: StoreDataService,
    },
  ],
  exports: [IStoresDataSourceService, TypeOrmModule],
})
export class StoresDataSourceModule {}
