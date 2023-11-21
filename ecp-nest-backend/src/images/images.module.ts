import { Module } from '@nestjs/common';
import { ImageFactoryService } from './application/use-cases/image-factory.service';
import { ImageUseCases } from './application/use-cases/image-use-cases';
import { ImagesDataSourceModule } from './infrastructure/data/images-datasource.module';
import { ImageResolver } from './interface-adapters/graphql/resolvers/image.resolver';

@Module({
  imports: [ImagesDataSourceModule],
  providers: [ImageFactoryService, ImageUseCases, ImageResolver],
})
export class ImagesModule {}
