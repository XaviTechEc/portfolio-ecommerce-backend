import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';
import BaseResolver from 'src/core/abstracts/repositories/base-resolver.repository';

@ObjectType()
class Character {
  @Field(() => String)
  msg: string;
}

@Resolver(() => Character)
export class UserResolver extends BaseResolver(Character) {
  constructor() {
    super();
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
