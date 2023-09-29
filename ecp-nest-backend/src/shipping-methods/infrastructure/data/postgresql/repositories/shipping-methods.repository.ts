import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IShippingMethodsRepository } from 'src/shipping-methods/domain/abstracts/repositories/shipping-methods.repository';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/shipping-methods/domain/dtos/graphql/inputs/shipping-method.input';
import { Repository, FindManyOptions } from 'typeorm';
import { ShippingMethod } from '../entities/ShippingMethod.entity';

const CONTEXT = 'ShippingMethodsRepository';

export class ShippingMethodsRepository
  implements IShippingMethodsRepository<ShippingMethod>
{
  private _repository: Repository<ShippingMethod>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ShippingMethod>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllShippingMethods(
    args?: IGenericArgs<ShippingMethod>,
  ): Promise<ShippingMethod[]> {
    try {
      let queryOptions: FindManyOptions<ShippingMethod> = {};

      if (args?.paginationArgs) {
        const { limit = 10, offset = 0 } = args.paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      const shippingMethods = (await this._repository.find(queryOptions)) ?? [];
      return shippingMethods;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getShippingMethodById(id: string): Promise<ShippingMethod> {
    try {
      const shippingMethodFound = await this._repository.findOneBy({ id });
      if (!shippingMethodFound) {
        return this._exceptionsService.notFound({
          message: `The shipping method with id ${id} could not be found`,
        });
      }
      return shippingMethodFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<ShippingMethod> {
    try {
      const newShippingMethod = this._repository.create({
        ...createShippingMethodInput,
      });
      return this._repository.save(newShippingMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<ShippingMethod> {
    try {
      await this.getShippingMethodById(id);
      const newShippingMethod = await this._repository.preload({
        ...updateShippingMethodInput,
      });
      return this._repository.save(newShippingMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeShippingMethod(id: string): Promise<ShippingMethod> {
    try {
      const shippingMethod = await this.getShippingMethodById(id);
      return this._repository.remove(shippingMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
