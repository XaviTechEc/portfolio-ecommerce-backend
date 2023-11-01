import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IPaymentMethodsRepository } from 'src/payment-methods/domain/abstracts/repositories/payment-methods.repository';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { Repository, FindManyOptions } from 'typeorm';
import { PaymentMethod } from '../entities/PaymentMethod.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'PaymentMethodsRepository';

export class PaymentMethodsRepository
  implements IPaymentMethodsRepository<PaymentMethod>
{
  private _repository: Repository<PaymentMethod>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<PaymentMethod>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAllPaymentMethods(
    args?: IGenericArgs<PaymentMethod>,
  ): Promise<GetAllGenericResponse<PaymentMethod>> {
    try {
      let queryOptions: FindManyOptions<PaymentMethod> = {};
      let pageSize;
      if (args) {
        const { paginationArgs } = args;

        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          queryOptions = { take: limit, skip: offset };
        }
      }
      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getPaymentMethodById(id: string): Promise<PaymentMethod> {
    try {
      const paymentMethodFound = await this._repository.findOneBy({ id });
      if (!paymentMethodFound) {
        this._exceptionsService.notFound({
          message: `Payment Method with id ${id} could not be found`,
        });
      }
      return paymentMethodFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createPaymentMethod(
    data: CreatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    try {
      const newPaymentMethod = this._repository.create({ ...data });
      return this._repository.save(newPaymentMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updatePaymentMethod(
    id: string,
    data: UpdatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    try {
      await this.getPaymentMethodById(id);
      const newPaymentMethod = await this._repository.preload({
        ...data,
      });
      return this._repository.save(newPaymentMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removePaymentMethod(id: string): Promise<PaymentMethod> {
    try {
      const paymentMethod = await this.getPaymentMethodById(id);
      return this._repository.remove(paymentMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
