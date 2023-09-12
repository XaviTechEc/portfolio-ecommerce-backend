import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserAddressesDataSourceService } from 'src/user-addresses/domain/abstracts/services/user-addresses-datasource.abstract.service';
import { UserAddress } from './postgresql/entities/UserAddress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  providers: [
    {
      provide: IUserAddressesDataSourceService,
      useClass: UserAddressesDataSourceModule,
    },
  ],
  exports: [IUserAddressesDataSourceService, TypeOrmModule],
})
export class UserAddressesDataSourceModule {}
