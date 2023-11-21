import { Resolver } from '@nestjs/graphql';
import { BillboardUseCases } from 'src/billboard/application/use-cases/billboard-use-cases';
import {
  CreateBillboardInput,
  UpdateBillboardInput,
} from 'src/billboard/domain/dtos/graphql/inputs/billboard.input';
import { BillboardType } from 'src/billboard/interface-adapters/graphql/object-types/billboard.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => BillboardType)
export class BillboardResolver extends BaseResolver(BillboardType, {
  useCasesRef: BillboardUseCases,
  createInputRef: CreateBillboardInput,
  updateInputRef: UpdateBillboardInput,
}) {
  constructor(private billboardUseCases: BillboardUseCases) {
    super(billboardUseCases);
  }
}
