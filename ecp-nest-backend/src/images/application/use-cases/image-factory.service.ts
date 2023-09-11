import { Injectable } from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from 'src/core/dtos';
import { IImage } from 'src/core/entities';

@Injectable()
export class ImageFactoryService {
  createImage(createImageDto: CreateImageDto) {
    const newImage = new IImage();
    newImage.url = createImageDto.url;
    newImage.extension = createImageDto.extension;
    newImage.product = createImageDto.product;
    newImage.productItem = createImageDto.productItem;
    newImage.category = createImageDto.category;
    newImage.user = createImageDto.user;
    return newImage;
  }
  updateImage(updateImageDto: UpdateImageDto) {
    const newImage = new IImage();
    newImage.url = updateImageDto.url;
    newImage.extension = updateImageDto.extension;
    newImage.product = updateImageDto.product;
    newImage.productItem = updateImageDto.productItem;
    newImage.category = updateImageDto.category;
    newImage.user = updateImageDto.user;
    return newImage;
  }
}
