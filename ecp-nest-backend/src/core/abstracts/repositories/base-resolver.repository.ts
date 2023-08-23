import { Type } from '@nestjs/common';
import { Resolver, Query, ID, Args } from '@nestjs/graphql';

function BaseResolver<T extends Type<unknown>>(classRef: T) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    @Query(() => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return [];
    }

    @Query(() => [classRef], { name: `findOne${classRef.name}` })
    async findOne(
      @Args('id', { type: () => ID }) id: string,
    ): Promise<T | null> {
      return null;
    }
  }

  return BaseResolverHost;
}

export default BaseResolver;
