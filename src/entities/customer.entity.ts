import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CustomerTier } from "./customer-tier.entity";
import { QuotationHistory } from "./quotation-history.entity";

export class CustomerWithoutPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(["username"])
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  orgName: string;

  @Column()
  phone: string;

  @ManyToOne(type => CustomerTier, customerTier => customerTier.customers, {eager: true})
  tier: CustomerTier;

  @OneToMany(type => QuotationHistory, quotationHistory => quotationHistory.customer)
  quotationHistories: QuotationHistory[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

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

@Entity()
export class Customer extends CustomerWithoutPassword {
  @Column()
  password: string;
}
