import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IUsersRepository } from 'src/core/abstracts/repositories';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { User } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class UsersRepository implements IUsersRepository<User> {
  private _repository: Repository<User>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<User>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
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
    const seasonFound = await this._repository.findOneBy({ id });
    if (!seasonFound) {
      return this._exceptionsService.notFound({
        message: `The season with id ${id} could not be found`,
      });
    }
    return this._repository.save(seasonFound);
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
