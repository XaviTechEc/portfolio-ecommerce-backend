import { Module } from '@nestjs/common';
import { TagFactoryService } from './application/use-cases/factory/tag-factory.service';
import { TagUseCases } from './application/use-cases/tag-use-cases';
import { TagsDataSourceModule } from './infrastructure/data/tags-datasource.module';
import { TagResolver } from './interface-adapters/resolvers/tag.resolver';

@Module({
  imports: [TagsDataSourceModule],
  providers: [TagFactoryService, TagUseCases, TagResolver],
})
export class TagsModule {}
