import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from '../../dtos/graphql/inputs/billboard.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IBillboardsRepository<T> {
  abstract getAllBillboards(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getBillboardById(id: string): Promise<T>;
  abstract createBillboard(
    createBillboardInput: CreateBillboardInput,
  ): Promise<T>;
  abstract updateBillboard(
    id: string,
    updateBillboardInput: UpdateBillboardInput,
  ): Promise<T>;
  abstract removeBillboard(id: string): Promise<T>;
}
