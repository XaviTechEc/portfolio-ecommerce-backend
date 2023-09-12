import { Module } from '@nestjs/common';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';
import { AuthDataSourceService } from './auth-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: IAuthDataSourceService,
      useClass: AuthDataSourceService,
    },
  ],
  exports: [IAuthDataSourceService, TypeOrmModule],
})
export class AuthDatasourceModule {}
