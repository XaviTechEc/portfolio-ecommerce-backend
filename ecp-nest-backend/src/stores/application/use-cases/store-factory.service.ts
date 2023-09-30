import { Injectable } from '@nestjs/common';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from '../../domain/dtos/graphql/inputs/store.input';
import { IStore } from '../../domain/entities/store.entity';

@Injectable()
export class StoreFactoryService {
  createStore(createStoreInput: CreateStoreInput) {
    const newStore = new IStore();
    newStore.title = createStoreInput.title;
    newStore.description = createStoreInput.description;
    newStore.slug = createStoreInput.slug;
    newStore.user = createStoreInput.user;
    return newStore;
  }

  updateStore(updateStoreInput: UpdateStoreInput) {
    const newStore = new IStore();
    newStore.title = updateStoreInput.title;
    newStore.description = updateStoreInput.description;
    newStore.slug = updateStoreInput.slug;
    newStore.user = updateStoreInput.user;
    return newStore;
  }
}