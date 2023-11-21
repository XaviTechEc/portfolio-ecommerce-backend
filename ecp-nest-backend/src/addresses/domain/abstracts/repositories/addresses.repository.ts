import { IGenericDataRepository } from 'src/common/domain/abstracts/generic-data-methods.repository';

export abstract class IAddressesRepository<
  TData,
> extends IGenericDataRepository<TData> {
  constructor() {
    super();
  }
}
