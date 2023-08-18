import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Season } from "./Season";
import { CategoryPromotion } from "./CategoryPromotion";
import { ProductCategory } from "./ProductCategory";
import { Variation } from "./Variation";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class Category {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "value" })
  value: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("boolean", { name: "active", nullable: true, default: () => "true" })
  active: boolean | null;

  @Column("character varying", { name: "created_by" })
  createdBy: string;

  @ManyToOne(() => Category, (category) => category.categories)
  @JoinColumn([{ name: "parent_category_id", referencedColumnName: "id" }])
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];

  @ManyToOne(() => Season, (season) => season.categories)
  @JoinColumn([{ name: "season_id", referencedColumnName: "id" }])
  season: Season;

  @OneToMany(
    () => CategoryPromotion,
    (categoryPromotion) => categoryPromotion.category
  )
  categoryPromotions: CategoryPromotion[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category
  )
  productCategories: ProductCategory[];

  @OneToMany(() => Variation, (variation) => variation.category)
  variations: Variation[];
}
