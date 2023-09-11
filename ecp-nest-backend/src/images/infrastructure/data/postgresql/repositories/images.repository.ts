import { IImageRepository } from 'src/core/abstracts/repositories';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { Image } from '../../entities/outputs/entities';
import {
  CreateImageDto,
  IGenericArgs,
  PaginationArgs,
  UpdateImageDto,
} from 'src/core/dtos';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

export class ImagesRepository implements IImageRepository<Image> {
  private _repository: Repository<Image>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Image>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getImagesBy(
    term: string,
    fields: (keyof Image)[],
    paginationArgs: PaginationArgs,
  ): Promise<Image[]> {
    let queryOptions: FindManyOptions<Image> = {};
    let relations: FindOptionsRelations<Image> = {};
    let where: FindOptionsWhere<Image> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    for (const field of fields) {
      if (field === 'product') {
        relations = { ...relations, product: true };
        where = {
          ...where,
          product: [
            { title: ILike(`%${term}%`) },
            { subtitle: ILike(`%${term}%`) },
            { description: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'productItem') {
        relations = { ...relations, productItem: true };
        where = {
          ...where,
          productItem: [
            { sku: ILike(`%${term}%`) },
            { slug: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'category') {
        relations = { ...relations, category: true };
        where = {
          ...where,
          category: [
            { value: ILike(`%${term}%`) },
            { description: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'user') {
        relations = { ...relations, user: true };
        where = {
          ...where,
          user: [
            { username: ILike(`%${term}%`) },
            { email: ILike(`%${term}%`) },
            { fullName: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const imagesBy = await this._repository.find(queryOptions);
    return imagesBy;
  }

  async getAllImages(args?: IGenericArgs<Image>): Promise<Image[]> {
    let qb = this._repository.createQueryBuilder('image');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const images = await qb.getMany();
    return images;
  }
  async createImage(createImageDto: CreateImageDto): Promise<Image> {
    const newImage = this._repository.create({ ...createImageDto });
    return newImage;
  }
  async getImageById(id: string): Promise<Image> {
    const imageFound = await this._repository.findOneBy({ id });
    return this._repository.save(imageFound);
  }
  async updateImage(
    id: string,
    updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    await this.getImageById(id);
    const newImage = await this._repository.preload({
      ...updateImageDto,
    });
    if (!newImage) {
      return this._exceptionsService.notFound({
        message: 'The Image could not be preloaded',
      });
    }
    return this._repository.remove(newImage);
  }
  async removeImage(id: string): Promise<Image> {
    const image = await this.getImageById(id);
    return this._repository.remove(image);
  }
}
