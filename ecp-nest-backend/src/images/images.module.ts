import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './infrastructure/data/postgresql/entities/Image.entity';
import { ImageResolver } from './interface-adapters/resolvers/image.resolver';
import { ImageFactoryService } from './application/use-cases/image-factory.service';
import { ImageUseCases } from './application/use-cases/image-use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageFactoryService, ImageUseCases, ImageResolver],
  exports: [TypeOrmModule],
})
export class ImagesModule {}
