import {
  InternalServerErrorException,
  ParseUUIDPipe,
  Type,
} from '@nestjs/common';
import {
  Args,
  Field,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { OrderFieldType } from 'src/common/domain/dtos/graphql/args/order.args';
import {
  ICustomError,
  ICustomGenericResponse,
  ICustomGenericResponseWithPagination,
} from 'src/common/domain/interfaces/responses/custom-generic-response.interface';
import { IUser } from 'src/users/domain/entities/user.entity';

export interface IBaseResolverHostInterface<TRef, TCreateInput, TUpdateInput> {
  getAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
    orderArgs: OrderFieldType[],
    user: IUser,
  ): Promise<ICustomGenericResponseWithPagination<TRef>>;

  getOneById(id: string, user: IUser): Promise<ICustomGenericResponse<TRef>>;

  create(
    createInputData: TCreateInput,
    user: IUser,
  ): Promise<ICustomGenericResponse<TRef>>;

  updateOneById(
    updateInputData: TUpdateInput,
    user: IUser,
  ): Promise<ICustomGenericResponse<TRef>>;

  deleteOneById(id: string, user: IUser): Promise<ICustomGenericResponse<TRef>>;

  restoreOneById(
    id: string,
    user: IUser,
  ): Promise<ICustomGenericResponse<TRef>>;
}

interface BaseResolveProps<TUseCases, TCreateInput, TUpdateInput> {
  useCasesRef: Type<TUseCases>;
  createInputRef: Type<TCreateInput>;
  updateInputRef: Type<TUpdateInput>;
}

export function BaseResolver<
  TRef,
  TUseCases = any,
  TCreateInput = any,
  TUpdateInput = any,
>(
  classRef: Type<TRef>,
  options: BaseResolveProps<TUseCases, TCreateInput, TUpdateInput>,
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost
    implements IBaseResolverHostInterface<TRef, TCreateInput, TUpdateInput>
  {
    private _useCasesRef: any;
    constructor(useCasesRef: any) {
      this._useCasesRef = useCasesRef;
    }
    @Mutation(() => GenericResponseType, {
      name: `create${classRef.name}`,
    })
    async create(
      @Args('createInputData', { type: () => options.createInputRef })
      createInputData: TCreateInput,
      @CurrentUser() user: IUser,
    ): Promise<ICustomGenericResponse<TRef>> {
      return this._useCasesRef.create({
        data: createInputData,
        user,
      });
    }

    @Query(() => GenericResponseWithPaginationType, {
      name: `getAll${classRef.name}`,
    })
    async getAll(
      @Args() paginationArgs: PaginationArgs,
      @Args() searchArgs: SearchArgs<TRef>,
      @Args('orderArgs', { type: () => [OrderFieldType], nullable: true })
      orderArgs: OrderFieldType<TRef>[],
      @CurrentUser() user: IUser,
    ): Promise<ICustomGenericResponseWithPagination<TRef>> {
      try {
        return this._useCasesRef.getMany({
          args: {
            paginationArgs,
            searchArgs,
            orderArgs,
          },
          user,
        });
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(error);
      }
    }

    @Query(() => GenericResponseType, {
      name: `getOne${classRef.name}ById`,
    })
    async getOneById(
      @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
      @CurrentUser() user: IUser,
    ): Promise<ICustomGenericResponse<TRef>> {
      return this._useCasesRef.getOneById({ id, user });
    }

    @Mutation(() => GenericResponseType, {
      name: `updateOne${classRef.name}ById`,
    })
    async updateOneById(
      @Args('updateInputData', { type: () => options.updateInputRef })
      updateInputData: TUpdateInput,
      @CurrentUser() user: IUser,
    ): Promise<ICustomGenericResponse<TRef>> {
      return this._useCasesRef.updateOneById({
        id: (updateInputData as any).id,
        data: updateInputData,
        user,
      });
    }

    @Mutation(() => GenericResponseType, {
      name: `deleteOne${classRef.name}ById`,
    })
    async deleteOneById(
      @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
      @CurrentUser() user: IUser,
    ): Promise<ICustomGenericResponse<TRef>> {
      return this._useCasesRef.deleteOneById({ id, user });
    }

    @Mutation(() => GenericResponseType, {
      name: `restore${classRef.name}ById`,
    })
    async restoreOneById(
      @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
      @CurrentUser() user: IUser,
    ): Promise<ICustomGenericResponse<TRef>> {
      return this._useCasesRef.restoreOneById({ id, user });
    }
  }

  @ObjectType(`${classRef.name}GenericResponseWithPagination`, {
    isAbstract: true,
  })
  abstract class GenericResponseWithPaginationType<TData>
    implements ICustomGenericResponseWithPagination<TData>
  {
    @Field(() => Boolean)
    success: boolean;

    @Field(() => [classRef])
    data: TData[];
  }

  @ObjectType(`${classRef.name}ErrorType`, {
    isAbstract: true,
  })
  abstract class CustomErrorType implements ICustomError {
    @Field(() => Int)
    code: number;

    @Field(() => String)
    message: string;
  }

  @ObjectType(`${classRef.name}GenericResponse`, { isAbstract: true })
  abstract class GenericResponseType<TData>
    implements ICustomGenericResponse<TData>
  {
    @Field(() => Boolean)
    success: boolean;

    @Field(() => classRef)
    data: TData;

    @Field(() => CustomErrorType, { nullable: true })
    error?: CustomErrorType;
  }

  return BaseResolverHost;
}
