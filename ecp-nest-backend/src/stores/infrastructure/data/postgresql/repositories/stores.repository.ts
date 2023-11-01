import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IStoresRepository } from 'src/stores/domain/abstracts/repositories/stores.repository';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from 'src/stores/domain/dtos/graphql/inputs/store.input';
import { Repository } from 'typeorm';
import { Store } from '../entities/Store.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'StoresRepository';

export class StoresRepository implements IStoresRepository<Store> {
  private _repository: Repository<Store>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Store>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllStores(
    args?: IGenericArgs<Store>,
  ): Promise<GetAllGenericResponse<Store>> {
    try {
      let qb = this._repository.createQueryBuilder('store');
      let pageSize;
      if (args) {
        const { paginationArgs, searchArgs } = args;

        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.limit(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;
          if (searchTerm) {
            qb = qb
              .where('store.name ILIKE LOWER(:name)')
              .orWhere('store.description ILIKE LOWER(:description)')
              .setParameters({
                name: `%${searchTerm}%`,
                description: `%${searchTerm}%`,
              });
          }
        }
      }
      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getStoreById(id: string): Promise<Store> {
    try {
      const storeFound = await this._repository.findOneBy({ id });
      if (!storeFound) {
        return this._exceptionsService.notFound({
          message: `Store with id ${id} not found`,
        });
      }
      return storeFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createStore(createStoreInput: CreateStoreInput): Promise<Store> {
    try {
      const store = this._repository.create(createStoreInput);
      const storeCreated = await this._repository.save(store);
      return storeCreated;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateStore(
    id: string,
    updateStoreInput: UpdateStoreInput,
  ): Promise<Store> {
    try {
      await this.getStoreById(id);
      const newStore = await this._repository.preload({ ...updateStoreInput });
      const storeUpdated = await this._repository.save(newStore);
      return storeUpdated;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeStore(id: string): Promise<Store> {
    try {
      const storeFound = await this.getStoreById(id);
      const storeRemoved = await this._repository.remove(storeFound);
      return storeRemoved;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
