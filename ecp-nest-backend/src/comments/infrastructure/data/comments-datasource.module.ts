import { Module } from '@nestjs/common';
import { CommentsDataService } from './comments-datasource.service';
import { ICommentsDataSourceService } from 'src/comments/domain/abstracts/services/comments-datasource.abstract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './postgresql/entities/Comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [
    {
      provide: ICommentsDataSourceService,
      useClass: CommentsDataService,
    },
  ],
  exports: [ICommentsDataSourceService, TypeOrmModule],
})
export class CommentsDataSourceModule {}
