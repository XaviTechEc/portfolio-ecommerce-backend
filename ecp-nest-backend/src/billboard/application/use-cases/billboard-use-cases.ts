import { Injectable } from '@nestjs/common';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from 'src/billboard/domain/dtos/graphql/inputs/billboard.input';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { BillboardFactoryService } from './billboard-factory.service';
import { IBillboardsDataSourceService } from 'src/billboard/domain/abstracts/services/billboards-datasource.abstract.service';

@Injectable()
export class BillboardUseCases {
  constructor(
    private dataServices: IBillboardsDataSourceService,
    private billboardFactoryService: BillboardFactoryService,
  ) {}

  getMany(props: GetManyProps<IBillboard>) {
    return this.dataServices.billboards.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.billboards.getOneById({ ...props });
  }

  create(props: CreateProps<CreateBillboardInput>) {
    const newBillboard = this.billboardFactoryService.createBillboard(
      props.data,
    );
    return this.dataServices.billboards.create({
      ...props,
      data: newBillboard,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateBillboardInput>) {
    const newBillboard = this.billboardFactoryService.updateBillboard(
      props.data,
    );
    return this.dataServices.billboards.updateOneById({
      ...props,
      data: newBillboard,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.billboards.deleteOneById({ ...props });
  }
}
