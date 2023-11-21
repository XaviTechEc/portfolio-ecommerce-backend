import { IStoresDataSourceService } from 'src/stores/domain/abstracts/services/stores-datasource.abstract.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './postgresql/entities/Store.entity';
import { StoresDataService } from './stores-datasource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [
    {
      provide: IStoresDataSourceService,
      useClass: StoresDataService,
    },
  ],
  exports: [IStoresDataSourceService, TypeOrmModule],
})
export class StoresDataSourceModule {}
