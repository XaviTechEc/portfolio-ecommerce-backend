import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IUsersRepository } from 'src/users/domain/abstracts/repositories/users.repository';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/users/domain/dtos/rest/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'UsersRepository';

export class UsersRepository implements IUsersRepository<User> {
  private _repository: Repository<User>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<User>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllUsers(
    args?: IGenericArgs<User>,
  ): Promise<GetAllGenericResponse<User>> {
    try {
      let qb = this._repository.createQueryBuilder('user');
      let pageSize;

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          if (searchTerm) {
            qb = qb
              .where(`user.full_name ILIKE LOWER(:fullName)`)
              .orWhere('user.username ILIKE LOWER(:username)')
              .orWhere('user.email ILIKE LOWER(:email)')
              .setParameters({
                fullName: `%${searchTerm}%`,
                username: `%${searchTerm}%`,
                email: `%${searchTerm}%`,
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

  async getUserById(id: string): Promise<User> {
    try {
      const userFound = await this._repository.findOneBy({ id });
      if (!userFound) {
        return this._exceptionsService.notFound({
          message: `The user with id ${id} could not be found`,
        });
      }
      return userFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getShortUserById(id: string): Promise<User> {
    try {
      const userFound = await this._repository.findOne({
        where: { id },
        select: [
          'id',
          'fullName',
          'username',
          'email',
          'avatarImg',
          'lastConnection',
          'active',
          'roles',
        ],
      });
      if (!userFound) {
        return this._exceptionsService.notFound({
          message: `The user with id ${id} could not be found`,
        });
      }
      return userFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const newUser = this._repository.create({ ...data });
      return this._repository.save(newUser);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    try {
      await this.getUserById(id);
      const newUser = await this._repository.preload({
        ...data,
      });
      return this._repository.save(newUser);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeUser(id: string): Promise<User> {
    try {
      const user = await this.getUserById(id);
      return this._repository.remove(user);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
