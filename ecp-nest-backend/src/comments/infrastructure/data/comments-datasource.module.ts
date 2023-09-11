import { Module } from '@nestjs/common';
import { CommentsDataService } from './comments-datasource.service';
import { ICommentsDataSourceService } from 'src/comments/domain/abstracts/services/comments-datasource.abstract.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [
    {
      provide: ICommentsDataSourceService,
      useClass: CommentsDataService,
    },
  ],
  exports: [ICommentsDataSourceService],
})
export class CommentsDataSourceModule {}
