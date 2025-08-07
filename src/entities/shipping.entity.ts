import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ShippingType {
  OCEAN = "ocean",
  AIR = "air"
}

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Column of shipping ocean freight rate per unit
   * Unit is CNY/KG
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  unitPrice: number;

  /**
   * Column of shipping type
   * ocean or air
   */
  @Column({
    type: "enum",
    enum: ShippingType,
    nullable: false
  })
  type: ShippingType;
}
