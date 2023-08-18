import { Column, Entity, Index, OneToMany } from "typeorm";
import { CategoryPromotion } from "./CategoryPromotion";
import { ProductPromotion } from "./ProductPromotion";

@Index("promotion_pkey", ["id"], { unique: true })
@Entity("promotion", { schema: "public" })
export class Promotion {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("integer", {
    name: "percentage_discount",
    nullable: true,
    default: () => "0",
  })
  percentageDiscount: number | null;

  @Column("timestamp without time zone", {
    name: "start_date",
    nullable: true,
    default: () => "'2023-08-17 18:59:44.975524'",
  })
  startDate: Date | null;

  @Column("timestamp without time zone", { name: "end_date", nullable: true })
  endDate: Date | null;

  @OneToMany(
    () => CategoryPromotion,
    (categoryPromotion) => categoryPromotion.promotion
  )
  categoryPromotions: CategoryPromotion[];

  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.promotion
  )
  productPromotions: ProductPromotion[];
}
