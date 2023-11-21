import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';
import AddressPostgresDataService from './postgresql/address-postgres-data.service';
import { Address, Country, Location } from './postgresql/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Country, Location])],
  providers: [
    {
      provide: IAddressDataSourceService,
      useClass: AddressPostgresDataService,
    },
  ],
  exports: [IAddressDataSourceService, TypeOrmModule],
})
export class AddressDataSourceModule {}
