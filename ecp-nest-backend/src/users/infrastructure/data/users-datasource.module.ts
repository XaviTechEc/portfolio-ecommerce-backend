import { Module } from '@nestjs/common';
import { IUsersDataSourceService } from 'src/users/domain/abstracts/services/users-datasource.abstract.service';
import { UsersDataService } from './users-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './postgresql/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: IUsersDataSourceService,
      useClass: UsersDataService,
    },
  ],
  exports: [IUsersDataSourceService],
})
export class UsersDataSourceModule {}
