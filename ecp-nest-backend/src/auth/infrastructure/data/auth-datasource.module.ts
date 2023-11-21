import { Module } from '@nestjs/common';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';
import { AuthDataSourceService } from './auth-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { Role } from 'src/roles/infrastructure/data/postgresql/entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [
    {
      provide: IAuthDataSourceService,
      useClass: AuthDataSourceService,
    },
  ],
  exports: [IAuthDataSourceService, TypeOrmModule],
})
export class AuthDatasourceModule {}
