import { IBillboardDataSourceService } from 'src/billboard/domain/abstracts/services/billboard-datasource.abstract.service';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from 'src/billboard/domain/dtos/graphql/inputs/billboard.input';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { BillboardFactoryService } from './billboard-factory.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillboardUseCases {
  constructor(
    private dataService: IBillboardDataSourceService,
    private billboardFactoryService: BillboardFactoryService,
  ) {}

  getAllBillboards(args?: IGenericArgs<IBillboard>): Promise<IBillboard[]> {
    return this.dataService.billboards.getAllBillboards(args);
  }

  getBillboardById(id: string): Promise<IBillboard> {
    return this.dataService.billboards.getBillboardById(id);
  }
  createBillboard(
    createBillboardInput: CreateBillboardInput,
  ): Promise<IBillboard> {
    const billboard =
      this.billboardFactoryService.createBillboard(createBillboardInput);

    return this.dataService.billboards.createBillboard(billboard);
  }
  updateBillboard(
    id: string,
    updateBillboardInput: UpdateBillboardInput,
  ): Promise<IBillboard> {
    const billboard =
      this.billboardFactoryService.updateBillboard(updateBillboardInput);
    return this.dataService.billboards.updateBillboard(id, billboard);
  }
  removeBillboard(id: string): Promise<IBillboard> {
    return this.dataService.billboards.removeBillboard(id);
  }
}
