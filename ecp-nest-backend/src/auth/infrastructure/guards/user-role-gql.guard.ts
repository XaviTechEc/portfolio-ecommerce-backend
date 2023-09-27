import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserRolesGqlGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    console.log(ctx.getContext());
    console.log(ctx.getHandler());

    // if (!user) {
    //   throw new InternalServerErrorException('User not found');
    // }

    return true;
  }
}
