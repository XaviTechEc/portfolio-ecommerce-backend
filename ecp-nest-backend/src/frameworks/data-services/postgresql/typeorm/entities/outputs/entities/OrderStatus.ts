import { Column, Entity, Index } from "typeorm";

@Index("order_status_pkey", ["id"], { unique: true })
@Entity("order_status", { schema: "public" })
export class OrderStatus {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("enum", {
    name: "status_value",
    nullable: true,
    enum: ["placed", "processing", "in_progress", "delivered"],
  })
  statusValue: "placed" | "processing" | "in_progress" | "delivered" | null;
}
