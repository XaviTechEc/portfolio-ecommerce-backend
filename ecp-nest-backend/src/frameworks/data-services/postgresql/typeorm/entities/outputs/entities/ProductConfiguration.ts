import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { VariationOption } from "./VariationOption";

@Entity("product_configuration", { schema: "public" })
export class ProductConfiguration {
  @Column("character varying", { name: "product_item_id" })
  productItemId: string;

  @ManyToOne(
    () => VariationOption,
    (variationOption) => variationOption.productConfigurations
  )
  @JoinColumn([{ name: "variation_option_id", referencedColumnName: "id" }])
  variationOption: VariationOption;
}
