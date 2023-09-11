import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './infrastructure/data/postgresql/entities/Comment.entity';
import { CommentFactoryService } from './application/use-cases/comment-factory.service';
import { CommentUseCases } from './application/use-cases/comment-use-cases';
import { CommentResolver } from './interface-adapters/resolvers/comment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentFactoryService, CommentUseCases, CommentResolver],
  exports: [TypeOrmModule],
})
export class CommentsModule {}
