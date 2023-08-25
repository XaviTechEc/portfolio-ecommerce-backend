import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { CommentFactoryService } from './comment-factory.service';
import { CommentUseCases } from './comment-use-cases';

@Module({
  imports: [DataServicesModule],
  exports: [CommentFactoryService, CommentUseCases],
  providers: [CommentFactoryService, CommentUseCases],
})
export class CommentsUseCasesModule {}
