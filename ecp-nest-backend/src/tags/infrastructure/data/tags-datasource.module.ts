import { Module } from '@nestjs/common';
import { TagsDataService } from './tags-datasource.service';
import { ITagsDataSourceService } from 'src/tags/domain/abstracts/services/tags-datasource.abstract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './postgresql/entities/Tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [
    {
      provide: ITagsDataSourceService,
      useClass: TagsDataService,
    },
  ],
  exports: [ITagsDataSourceService, TypeOrmModule],
})
export class TagsDataSourceModule {}
