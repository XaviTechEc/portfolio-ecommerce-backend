import { IGenericArgs } from '../dtos/graphql/args/generic-args.repository';
import {
  ICustomGenericResponse,
  ICustomGenericResponseWithPagination,
} from '../interfaces/responses/custom-generic-response.interface';

export interface BaseProps {
  user: any;
}
export interface GetManyProps<TData> extends BaseProps {
  args: IGenericArgs<TData>;
}

export interface GetOneByNameProps extends BaseProps {
  name: string;
}

export interface GetOneByIdProps extends BaseProps {
  id: string;
}
export interface CreateProps<TData> extends BaseProps {
  data: TData;
}
export interface UpdateOneByIdProps<TData> extends BaseProps {
  id: string;
  data: TData;
  user: any;
}
export interface DeleteOneByIdProps extends BaseProps {
  id: string;
}
export interface RestoreOneByIdProps extends BaseProps {
  id: string;
}

export abstract class IGenericDataRepository<TData> {
  abstract getMany(
    props: GetManyProps<TData>,
  ): Promise<ICustomGenericResponseWithPagination<TData>>;

  abstract getOneById(
    props: GetOneByIdProps,
  ): Promise<ICustomGenericResponse<TData>>;

  abstract create(
    props: CreateProps<TData>,
  ): Promise<ICustomGenericResponse<TData>>;

  abstract updateOneById(
    props: UpdateOneByIdProps<TData>,
  ): Promise<ICustomGenericResponse<TData>>;

  abstract deleteOneById(
    props: DeleteOneByIdProps,
  ): Promise<ICustomGenericResponse<TData>>;

  abstract restoreOneById(
    props: RestoreOneByIdProps,
  ): Promise<ICustomGenericResponse<TData>>;
}
