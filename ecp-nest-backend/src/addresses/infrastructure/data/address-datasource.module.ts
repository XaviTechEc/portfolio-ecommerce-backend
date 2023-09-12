import { Module } from '@nestjs/common';
import { AddressDataSourceService } from './address-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Country, Location } from './postgresql/entities';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Country, Location])],
  providers: [
    {
      provide: IAddressDataSourceService,
      useClass: AddressDataSourceService,
    },
  ],
  exports: [IAddressDataSourceService, TypeOrmModule],
})
export class AddressDataSourceModule {}
