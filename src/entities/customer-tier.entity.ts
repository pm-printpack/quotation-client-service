import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
export class CustomerTier {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(["name"])
  @Column()
  name: string;

  @Column({
    type: "int"
  })
  digitalPrintingProfitMargin: number;

  @Column({
    type: "int"
  })
  offsetPrintingProfitMargin: number;

  @Column({
    type: "int"
  })
  gravurePrintingProfitMargin: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  minimumDiscountAmount1: number;

  @Column({
    type: "int"
  })
  preferentialProfitMargin1: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  minimumDiscountAmount2: number;

  @Column({
    type: "int"
  })
  preferentialProfitMargin2: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @OneToMany(type => Customer, customer => customer.tier)
  customers: Customer[];

  @Column({
    type: "boolean",
    default: false
  })
  isArchived: boolean;

  @Column({
    type: "timestamp",
    nullable: true
  })
  archivedAt?: Date;
}
