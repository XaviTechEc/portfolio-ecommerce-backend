import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { SeasonFactoryService } from './season-factory.service';
import { SeasonUseCases } from './season-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [SeasonFactoryService, SeasonUseCases],
  providers: [SeasonFactoryService, SeasonUseCases],
})
export class SeasonsUseCasesModule {}
