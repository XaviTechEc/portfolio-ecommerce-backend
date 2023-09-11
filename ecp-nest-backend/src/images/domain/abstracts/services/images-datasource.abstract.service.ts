import { IImage } from '../../entities/image.entity';
import { IImageRepository } from '../repositories/image.repository';

export abstract class IImagesDataSourceService {
  // Images
  abstract images: IImageRepository<IImage>;
}
