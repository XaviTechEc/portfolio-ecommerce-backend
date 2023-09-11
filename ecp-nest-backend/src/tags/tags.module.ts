import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './infrastructure/data/postgresql/entities/Tag.entity';
import { TagFactoryService } from './application/use-cases/factory/tag-factory.service';
import { TagUseCases } from './application/use-cases/tag-use-cases';
import { TagResolver } from './interface-adapters/resolvers/tag.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagFactoryService, TagUseCases, TagResolver],
  exports: [TypeOrmModule],
})
export class TagsModule {}
