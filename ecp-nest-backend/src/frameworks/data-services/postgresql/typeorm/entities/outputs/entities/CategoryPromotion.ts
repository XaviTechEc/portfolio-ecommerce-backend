import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { Promotion } from "./Promotion";

@Entity("category_promotion", { schema: "public" })
export class CategoryPromotion {
  @ManyToOne(() => Category, (category) => category.categoryPromotions)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => Promotion, (promotion) => promotion.categoryPromotions)
  @JoinColumn([{ name: "promotion_id", referencedColumnName: "id" }])
  promotion: Promotion;
}
