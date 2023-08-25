import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { ReviewFactoryService } from './review-factory.service';
import { ReviewUseCases } from './review-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [ReviewFactoryService, ReviewUseCases],
  providers: [ReviewFactoryService, ReviewUseCases],
})
export class ReviewsUseCasesModule {}
