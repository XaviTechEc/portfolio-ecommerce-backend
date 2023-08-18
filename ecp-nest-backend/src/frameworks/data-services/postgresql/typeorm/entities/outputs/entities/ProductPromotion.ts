import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Promotion } from "./Promotion";

@Entity("product_promotion", { schema: "public" })
export class ProductPromotion {
  @Column("character varying", { name: "product_id" })
  productId: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotions)
  @JoinColumn([{ name: "promotion_id", referencedColumnName: "id" }])
  promotion: Promotion;
}
