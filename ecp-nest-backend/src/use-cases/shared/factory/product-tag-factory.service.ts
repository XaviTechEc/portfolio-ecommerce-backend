import { Injectable } from '@nestjs/common';
import { CreateProductTagInput, UpdateProductTagInput } from 'src/core/dtos';
import { IProductTag } from 'src/core/entities';

@Injectable()
export class ProductTagFactoryService {
  createProductTag(createProductTagInput: CreateProductTagInput) {
    const newProductTag = new IProductTag();
    newProductTag.product = createProductTagInput.product;
    newProductTag.tag = createProductTagInput.tag;
    return newProductTag;
  }
  updateProductTag(updateProductTagInput: UpdateProductTagInput) {
    const newProductTag = new IProductTag();
    newProductTag.product = updateProductTagInput.product;
    newProductTag.tag = updateProductTagInput.tag;
    return newProductTag;
  }
}
