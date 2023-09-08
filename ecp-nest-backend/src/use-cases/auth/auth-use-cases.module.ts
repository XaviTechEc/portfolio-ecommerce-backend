import { Module } from '@nestjs/common';
import { AuthUseCases } from './auth-use-cases';
import { DataServicesModule } from 'src/services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  exports: [AuthUseCases],
  providers: [AuthUseCases],
})
export class AuthUseCasesModule {}
