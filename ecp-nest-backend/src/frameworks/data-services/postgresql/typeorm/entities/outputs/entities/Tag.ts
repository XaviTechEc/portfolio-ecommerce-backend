import { Column, Entity, Index, OneToMany } from "typeorm";
import { ProductTag } from "./ProductTag";

@Index("tag_code_idx", ["code"], {})
@Index("tag_pkey", ["id"], { unique: true })
@Index("tag_value_idx", ["value"], {})
@Entity("tag", { schema: "public" })
export class Tag {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "code" })
  code: string;

  @Column("character varying", { name: "value" })
  value: string;

  @OneToMany(() => ProductTag, (productTag) => productTag.tag)
  productTags: ProductTag[];
}
