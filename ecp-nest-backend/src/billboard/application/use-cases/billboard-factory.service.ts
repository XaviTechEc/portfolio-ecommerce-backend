import { Injectable } from '@nestjs/common';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from 'src/billboard/domain/dtos/graphql/inputs/billboard.input';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';

@Injectable()
export class BillboardFactoryService {
  createBillboard(createBillboardInput: CreateBillboardInput) {
    const newBillboard = new IBillboard();
    newBillboard.title = createBillboardInput.title;
    newBillboard.store = createBillboardInput.store;
    newBillboard.season = createBillboardInput.season;
    newBillboard.active = createBillboardInput.active;
    newBillboard.description = createBillboardInput.description;
    return newBillboard;
  }

  updateBillboard(updateBillboardInput: UpdateBillboardInput) {
    const newBillboard = new IBillboard();
    newBillboard.id = updateBillboardInput.id;
    newBillboard.title = updateBillboardInput.title;
    newBillboard.store = updateBillboardInput.store;
    newBillboard.season = updateBillboardInput.season;
    newBillboard.active = updateBillboardInput.active;
    newBillboard.description = updateBillboardInput.description;
    return newBillboard;
  }
}
