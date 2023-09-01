import { Injectable } from '@nestjs/common';
import { IProductTagRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IProductTag } from 'src/core/entities';
import { ProductTagFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/core/dtos';

@Injectable()
export class ProductTagUseCases implements IProductTagRepository<IProductTag> {
  constructor(
    private dataService: IDataSourcesService,
    private productTagFactoryService: ProductTagFactoryService,
  ) {}
  getAllProductTag(args?: IGenericArgs<IProductTag>): Promise<IProductTag[]> {
    return this.dataService.productTags.getAllProductTag(args);
  }
  getOneProductTagById(id: string): Promise<IProductTag> {
    return this.dataService.productTags.getOneProductTagById(id);
  }
  createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<IProductTag> {
    const productTag = this.productTagFactoryService.createProductTag(
      createProductTagInput,
    );
    return this.dataService.productTags.createProductTag(productTag);
  }
  updateOneProductTagById(
    id: string,
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<IProductTag> {
    const productTag = this.productTagFactoryService.updateProductTag(
      updateProductTagInput,
    );
    return this.dataService.productTags.updateOneProductTagById(id, productTag);
  }
  deleteOneProductTagById(id: string): Promise<IProductTag> {
    return this.dataService.productTags.deleteOneProductTagById(id);
  }
}