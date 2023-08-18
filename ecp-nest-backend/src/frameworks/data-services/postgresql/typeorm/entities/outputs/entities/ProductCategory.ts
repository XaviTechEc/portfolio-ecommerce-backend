import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity("product_category", { schema: "public" })
export class ProductCategory {
  @Column("character varying", { name: "product_id" })
  productId: string;

  @ManyToOne(() => Category, (category) => category.productCategories)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;
}
