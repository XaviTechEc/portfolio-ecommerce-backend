import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Query } from '@nestjs/graphql';
import { PaginationArgs, SearchArgs } from 'src/core/dtos';
import { IUser } from 'src/core/entities';
import { UserType } from 'src/core/enums';
import { UserUseCases } from 'src/use-cases';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userUseCases: UserUseCases) {}

  @Query(() => [UserType], { name: 'users' })
  getAllUsers(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IUser[]> {
    return this.userUseCases.getAllUsers({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => UserType, { name: 'user' })
  getUserById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IUser> {
    return this.userUseCases.getUserById(id);
  }
}
