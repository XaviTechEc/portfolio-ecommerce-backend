import { Injectable } from '@nestjs/common';
import {
  CreateImageDto,
  UpdateImageDto,
} from 'src/images/domain/dtos/rest/image.dto';
import { IImage } from 'src/images/domain/entities/image.entity';

@Injectable()
export class ImageFactoryService {
  createImage(createImageDto: CreateImageDto) {
    const newImage = new IImage();
    newImage.url = createImageDto.url;
    newImage.extension = createImageDto.extension;
    newImage.product = createImageDto.product;
    newImage.productItem = createImageDto.productItem;
    newImage.category = createImageDto.category;
    newImage.billboard = createImageDto.billboard;
    return newImage;
  }
  updateImage(updateImageDto: UpdateImageDto) {
    const newImage = new IImage();
    newImage.id = updateImageDto.id;
    newImage.url = updateImageDto.url;
    newImage.extension = updateImageDto.extension;
    newImage.product = updateImageDto.product;
    newImage.productItem = updateImageDto.productItem;
    newImage.category = updateImageDto.category;
    newImage.billboard = updateImageDto.billboard;
    return newImage;
  }
}
