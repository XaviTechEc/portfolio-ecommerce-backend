import { IGenericDataRepository } from 'src/common/domain/abstracts/generic-data-methods.repository';

export abstract class IStoresRepository<
  TData,
> extends IGenericDataRepository<TData> {
  constructor() {
    super();
  }
  // Add custom logic here ↓↓↓
}
