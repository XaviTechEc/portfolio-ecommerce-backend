import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BillboardUseCases } from 'src/billboard/application/use-cases/billboard-use-cases';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from 'src/billboard/domain/dtos/graphql/inputs/billboard.input';
import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { BillboardType } from 'src/billboard/domain/object-types/billboard.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';

@Resolver(() => BillboardType)
export class BillboardResolver {
  constructor(private readonly billboardUseCases: BillboardUseCases) {}

  @Query(() => [BillboardType], { name: 'billboards' })
  getAllBillboards(
    @Args('paginationArgs') paginationArgs: PaginationArgs,
    @Args('searchArgs') searchArgs: SearchArgs,
  ): Promise<IBillboard[]> {
    return this.billboardUseCases.getAllBillboards({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => BillboardType, { name: 'billboard' })
  getBillboard(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IBillboard> {
    return this.billboardUseCases.getBillboardById(id);
  }

  @Mutation(() => BillboardType, { name: 'createBillboard' })
  createBillboard(
    @Args('createBillboardInput') createBillboardInput: CreateBillboardInput,
  ): Promise<IBillboard> {
    return this.billboardUseCases.createBillboard(createBillboardInput);
  }

  @Mutation(() => BillboardType, { name: 'updateBillboard' })
  updateBillboard(
    @Args('updateBillboardInput') updateBillboardInput: UpdateBillboardInput,
  ): Promise<IBillboard> {
    return this.billboardUseCases.updateBillboard(
      updateBillboardInput.id,
      updateBillboardInput,
    );
  }

  @Mutation(() => BillboardType, { name: 'deleteBillboard' })
  deleteBillboard(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IBillboard> {
    return this.billboardUseCases.removeBillboard(id);
  }
}
