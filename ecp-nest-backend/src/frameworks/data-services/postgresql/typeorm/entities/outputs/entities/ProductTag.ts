import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Tag } from "./Tag";

@Entity("product_tag", { schema: "public" })
export class ProductTag {
  @Column("character varying", { name: "product_id" })
  productId: string;

  @ManyToOne(() => Tag, (tag) => tag.productTags)
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;
}
