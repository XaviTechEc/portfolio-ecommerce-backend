import { Injectable } from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from 'src/core/dtos';
import { IImage } from 'src/core/entities';

@Injectable()
export class ImageFactoryService {
  createImage(createImageDto: CreateImageDto) {
    const newImage = new IImage();
    newImage.url = createImageDto.url;
    newImage.extension = createImageDto.extension;
    newImage.product = createImageDto.productId;
    newImage.productItem = createImageDto.productItemId;
    newImage.category = createImageDto.categoryId;
    newImage.user = createImageDto.uploadedBy;
    return newImage;
  }
  updateImage(updateImageDto: UpdateImageDto) {
    const newImage = new IImage();
    newImage.url = updateImageDto.url;
    newImage.extension = updateImageDto.extension;
    newImage.product = updateImageDto.productId;
    newImage.productItem = updateImageDto.productItemId;
    newImage.category = updateImageDto.categoryId;
    newImage.user = updateImageDto.uploadedBy;
    return newImage;
  }
}
