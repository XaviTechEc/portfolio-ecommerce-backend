import { IStoresDataSourceService } from 'src/stores/domain/abstracts/services/stores-datasource.abstract.service';
import { StoreFactoryService } from './store-factory.service';
import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from 'src/stores/domain/dtos/graphql/inputs/store.input';
import { IStore } from 'src/stores/domain/entities/store.entity';

@Injectable()
export class StoreUseCases {
  constructor(
    private dataServices: IStoresDataSourceService,
    private storeFactoryService: StoreFactoryService,
  ) {}

  getMany(props: GetManyProps<IStore>) {
    return this.dataServices.stores.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.stores.getOneById({ ...props });
  }

  create(props: CreateProps<CreateStoreInput>) {
    const newStore = this.storeFactoryService.createStore(props.data);
    return this.dataServices.stores.create({ ...props, data: newStore });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateStoreInput>) {
    const newStore = this.storeFactoryService.updateStore(props.data);
    return this.dataServices.stores.updateOneById({
      ...props,
      data: newStore,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.stores.deleteOneById({ ...props });
  }
}
