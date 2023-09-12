import { Module } from '@nestjs/common';
import { CommentFactoryService } from './application/use-cases/comment-factory.service';
import { CommentUseCases } from './application/use-cases/comment-use-cases';
import { CommentsDataSourceModule } from './infrastructure/data/comments-datasource.module';
import { CommentResolver } from './interface-adapters/resolvers/comment.resolver';

@Module({
  imports: [CommentsDataSourceModule],
  providers: [CommentFactoryService, CommentUseCases, CommentResolver],
})
export class CommentsModule {}
