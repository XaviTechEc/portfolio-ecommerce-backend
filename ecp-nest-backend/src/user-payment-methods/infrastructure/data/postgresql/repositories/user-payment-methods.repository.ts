import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IUserPaymentMethodsRepository } from 'src/user-payment-methods/domain/abstracts/repositories/user-payment-methods.repository';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/user-payment-methods/domain/dtos/graphql/inputs/user-payment-method.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { UserPaymentMethod } from '../entities/UserPaymentMethod.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'UserPaymentMethodsRepository';

export class UserPaymentMethodsRepository
  implements IUserPaymentMethodsRepository<UserPaymentMethod>
{
  private _repository: Repository<UserPaymentMethod>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<UserPaymentMethod>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getUserPaymentMethodsBy(
    term: string,
    fields: (keyof UserPaymentMethod)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<UserPaymentMethod>> {
    try {
      let queryOptions: FindManyOptions<UserPaymentMethod> = {};
      let relations: FindOptionsRelations<UserPaymentMethod> = {};
      let where: FindOptionsWhere<UserPaymentMethod> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'paymentMethod') {
          relations = { ...relations, paymentMethod: true };
          where = {
            ...where,
            paymentMethod: [{ id: term }],
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

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllUserPaymentMethods(
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<GetAllGenericResponse<UserPaymentMethod>> {
    try {
      let qb = this._repository.createQueryBuilder('userPaymentMethod');
      let pageSize;

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getUserPaymentMethodById(id: string): Promise<UserPaymentMethod> {
    try {
      const userPaymentMethodFound = await this._repository.findOneBy({ id });
      if (!userPaymentMethodFound) {
        return this._exceptionsService.notFound({
          message: `The userPaymentMethod with id ${id} could not be found`,
        });
      }
      return userPaymentMethodFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<UserPaymentMethod> {
    try {
      const newUserPaymentMethod = this._repository.create({
        ...createUserPaymentMethodInput,
      });
      return this._repository.save(newUserPaymentMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<UserPaymentMethod> {
    try {
      await this.getUserPaymentMethodById(id);
      const newUserPaymentMethod = await this._repository.preload({
        ...updateUserPaymentMethodInput,
      });
      return this._repository.save(newUserPaymentMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeUserPaymentMethod(id: string): Promise<UserPaymentMethod> {
    try {
      const userPaymentMethod = await this.getUserPaymentMethodById(id);
      return this._repository.remove(userPaymentMethod);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
