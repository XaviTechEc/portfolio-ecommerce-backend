import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { TagFactoryService } from './tag-factory.service';

@Module({
  imports: [DataServicesModule],
  exports: [TagFactoryService, TagsUseCasesModule],
  providers: [TagFactoryService, TagsUseCasesModule],
})
export class TagsUseCasesModule {}
