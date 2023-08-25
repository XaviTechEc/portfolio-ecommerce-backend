import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { PromotionFactoryService } from './promotion-factory.service';
import { PromotionUseCases } from './promotion-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [PromotionFactoryService, PromotionUseCases],
  providers: [PromotionFactoryService, PromotionUseCases],
})
export class PromotionsUseCasesModule {}
