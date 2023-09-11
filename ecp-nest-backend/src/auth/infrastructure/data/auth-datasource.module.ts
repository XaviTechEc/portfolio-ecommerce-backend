import { Module } from '@nestjs/common';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';
import { AuthDataSourceService } from './auth-datasource.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IAuthDataSourceService,
      useClass: AuthDataSourceService,
    },
  ],
  exports: [IAuthDataSourceService],
})
export class AuthDatasourceModule {}
