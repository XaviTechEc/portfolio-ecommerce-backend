import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { IImage } from 'src/core/entities';
import { ImageType } from 'src/core/object-types';
import { ImageUseCases } from 'src/use-cases';

@Resolver(() => ImageType)
export class ImageResolver {
  constructor(private imageUseCases: ImageUseCases) {}

  @Query(() => [ImageType], { name: 'images' })
  getImagesBy(fields: Partial<IImage>): Promise<IImage[]> {
    return this.imageUseCases.getImagesBy(fields);
  }

  @Query(() => ImageType, { name: 'image' })
  getImageById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IImage> {
    return this.imageUseCases.getImageById(id);
  }
}
