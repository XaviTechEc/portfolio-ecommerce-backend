import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";

@Index("country_code_idx", ["code"], { unique: true })
@Index("country_code_key", ["code"], { unique: true })
@Index("country_pkey", ["id"], { unique: true })
@Entity("country", { schema: "public" })
export class Country {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "code", unique: true })
  code: string;

  @Column("character varying", { name: "long_name" })
  longName: string;

  @OneToMany(() => Address, (address) => address.country)
  addresses: Address[];
}
