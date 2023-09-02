import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { ImageFactoryService } from './image-factory.service';
import { ImageUseCases } from './image-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [ImageFactoryService, ImageUseCases],
  providers: [ImageFactoryService, ImageUseCases],
})
export class ImagesUseCasesModule {}
