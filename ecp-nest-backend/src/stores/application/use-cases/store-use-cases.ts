import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IStoresDataSourceService } from 'src/stores/domain/abstracts/services/stores-datasource.abstract.service';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from 'src/stores/domain/dtos/graphql/inputs/store.input';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { StoreFactoryService } from './store-factory.service';

@Injectable()
export class StoreUseCases {
  constructor(
    private dataService: IStoresDataSourceService,
    private storeFactoryService: StoreFactoryService,
  ) {}
  async getAllStores(args?: IGenericArgs<IStore>): Promise<IStore[]> {
    return this.dataService.stores.getAllStores(args);
  }

  async getStoreById(id: string): Promise<IStore> {
    return this.dataService.stores.getStoreById(id);
  }

  async createStore(createStoreInput: CreateStoreInput): Promise<IStore> {
    const store = this.storeFactoryService.createStore(createStoreInput);
    return this.dataService.stores.createStore(store);
  }

  async updateStore(
    id: string,
    updateStoreInput: UpdateStoreInput,
  ): Promise<IStore> {
    const store = this.storeFactoryService.updateStore(updateStoreInput);
    return this.dataService.stores.updateStore(id, store);
  }

  async removeStore(id: string): Promise<IStore> {
    return this.dataService.stores.removeStore(id);
  }
}
