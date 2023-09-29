import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IImageRepository } from 'src/images/domain/abstracts/repositories/image.repository';
import {
  CreateImageDto,
  UpdateImageDto,
} from 'src/images/domain/dtos/rest/image.dto';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Image } from '../entities/Image.entity';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';

const CONTEXT = 'ImagesRepository';

export class ImagesRepository implements IImageRepository<Image> {
  private _repository: Repository<Image>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Image>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
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
    try {
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

      const imagesBy = (await this._repository.find(queryOptions)) ?? [];
      return imagesBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllImages(args?: IGenericArgs<Image>): Promise<Image[]> {
    try {
      let qb = this._repository.createQueryBuilder('image');

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }
      }

      const images = (await qb.getMany()) ?? [];
      return images;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createImage(createImageDto: CreateImageDto): Promise<Image> {
    try {
      const newImage = this._repository.create({ ...createImageDto });
      return this._repository.save(newImage);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getImageById(id: string): Promise<Image> {
    try {
      const imageFound = await this._repository.findOneBy({ id });
      if (!imageFound) {
        return this._exceptionsService.notFound({
          message: `The Image with id ${id} could not be found`,
        });
      }
      return imageFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateImage(
    id: string,
    updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    try {
      await this.getImageById(id);
      const newImage = await this._repository.preload({
        ...updateImageDto,
      });
      return this._repository.save(newImage);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeImage(id: string): Promise<Image> {
    try {
      const image = await this.getImageById(id);
      return this._repository.remove(image);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
