import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { VariationOption } from "./VariationOption";

@Index("variation_pkey", ["id"], { unique: true })
@Entity("variation", { schema: "public" })
export class Variation {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @ManyToOne(() => Category, (category) => category.variations)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.variation
  )
  variationOptions: VariationOption[];
}
