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

  async getAllUsers(args?: IGenericArgs<User>): Promise<User[]> {
    let qb = this._repository.createQueryBuilder('user');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

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

    const users = await qb.getMany();
    return users;
  }
  async getUserById(id: string): Promise<User> {
    const userFound = await this._repository.findOneBy({ id });
    if (!userFound) {
      return this._exceptionsService.notFound({
        message: `The user with id ${id} could not be found`,
        code_error: 404,
      });
    }
    return this._repository.save(userFound);
  }
  async createUser(data: CreateUserDto): Promise<User> {
    const newUser = this._repository.create({ ...data });
    return newUser;
  }
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    const newUser = await this._repository.preload({
      ...data,
    });
    if (!newUser) {
      return this._exceptionsService.notFound({
        message: 'The User could not be preloaded',
      });
    }
    return this._repository.save(newUser);
  }
  async removeUser(id: string): Promise<User> {
    const user = await this.getUserById(id);
    return this._repository.remove(user);
  }
}
