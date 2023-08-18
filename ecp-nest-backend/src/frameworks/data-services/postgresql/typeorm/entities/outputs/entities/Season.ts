import { Column, Entity, Index, OneToMany } from "typeorm";
import { Category } from "./Category";

@Index("season_pkey", ["id"], { unique: true })
@Entity("season", { schema: "public" })
export class Season {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("timestamp without time zone", {
    name: "start_date",
    nullable: true,
    default: () => "'2023-08-17 18:59:45.222862'",
  })
  startDate: Date | null;

  @Column("timestamp without time zone", { name: "end_date", nullable: true })
  endDate: Date | null;

  @OneToMany(() => Category, (category) => category.season)
  categories: Category[];
}
