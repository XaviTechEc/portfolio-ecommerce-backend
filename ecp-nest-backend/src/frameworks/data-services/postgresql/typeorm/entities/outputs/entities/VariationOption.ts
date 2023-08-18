import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ProductConfiguration } from "./ProductConfiguration";
import { Variation } from "./Variation";

@Index("variation_option_pkey", ["id"], { unique: true })
@Entity("variation_option", { schema: "public" })
export class VariationOption {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "value" })
  value: string;

  @OneToMany(
    () => ProductConfiguration,
    (productConfiguration) => productConfiguration.variationOption
  )
  productConfigurations: ProductConfiguration[];

  @ManyToOne(() => Variation, (variation) => variation.variationOptions)
  @JoinColumn([{ name: "variation_id", referencedColumnName: "id" }])
  variation: Variation;
}
