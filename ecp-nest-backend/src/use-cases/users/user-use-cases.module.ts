import { Module } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user-use-cases';
import { DataServicesModule } from 'src/services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  exports: [UserFactoryService, UserUseCases],
  providers: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}
