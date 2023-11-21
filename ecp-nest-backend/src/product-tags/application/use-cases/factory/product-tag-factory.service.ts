import { Injectable } from '@nestjs/common';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/product-tags/domain/dtos/graphql/inputs/product-tag.input';
import { IProductTag } from 'src/product-tags/domain/entities/product-tag.entity';

@Injectable()
export class ProductTagFactoryService {
  createProductTag(createProductTagInput: CreateProductTagInput) {
    const newProductTag = new IProductTag();
    newProductTag.product = createProductTagInput.product;
    newProductTag.tag = createProductTagInput.tag;
    newProductTag.active = createProductTagInput.active;
    return newProductTag;
  }
  updateProductTag(updateProductTagInput: UpdateProductTagInput) {
    const newProductTag = new IProductTag();
    newProductTag.id = updateProductTagInput.id;
    newProductTag.product = updateProductTagInput.product;
    newProductTag.tag = updateProductTagInput.tag;
    newProductTag.active = updateProductTagInput.active;
    return newProductTag;
  }
}
