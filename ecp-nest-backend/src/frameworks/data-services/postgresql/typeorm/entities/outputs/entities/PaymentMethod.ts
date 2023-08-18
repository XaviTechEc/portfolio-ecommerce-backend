import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserPaymentMethod } from "./UserPaymentMethod";

@Index("payment_method_pkey", ["id"], { unique: true })
@Entity("payment_method", { schema: "public" })
export class PaymentMethod {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("enum", {
    name: "value",
    enum: ["credit_card", "other"],
    default: () => "'credit_card'",
  })
  value: "credit_card" | "other";

  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.paymentMethod
  )
  userPaymentMethods: UserPaymentMethod[];
}
