import { IImageRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { Image } from '../../entities/outputs/entities';
import { CreateImageDto, UpdateImageDto } from 'src/core/dtos';

export class ImagesRepository implements IImageRepository<Image> {
  private _repository: Repository<Image>;

  constructor(repository: Repository<Image>) {
    this._repository = repository;
  }
  getImagesBy(fields: Partial<Image>): Promise<Image[]> {
    throw new Error('Method not implemented.');
  }
  createImage(createImageDto: CreateImageDto): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  getImageById(id: string): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  updateImage(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  removeComment(id: string): Promise<Image> {
    throw new Error('Method not implemented.');
  }
}
