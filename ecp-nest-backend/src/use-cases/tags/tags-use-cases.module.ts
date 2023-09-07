import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { TagFactoryService } from './tag-factory.service';
import { TagUseCases } from './tag-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [TagFactoryService, TagUseCases],
  providers: [TagFactoryService, TagUseCases],
})
export class TagsUseCasesModule {}
