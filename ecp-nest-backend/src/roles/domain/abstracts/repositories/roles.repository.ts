import {
  GetOneByNameProps,
  IGenericDataRepository,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { ICustomGenericResponse } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';

export abstract class IRolesRepository<
  TData,
> extends IGenericDataRepository<TData> {
  constructor() {
    super();
  }
  // Add custom logic here ↓↓↓
  abstract getRoleByName(
    props: GetOneByNameProps,
  ): Promise<ICustomGenericResponse<TData>>;
}
