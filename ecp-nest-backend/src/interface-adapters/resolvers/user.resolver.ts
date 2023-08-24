import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Character {
  @Field(() => String)
  msg: string;
}

@Resolver(() => Character)
export class UserResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
