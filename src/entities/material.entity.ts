import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CategoryOption, CategoryPrintingType } from "./category.entity";

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  @Unique(["name"])
  name: string;

  @Column({
    nullable: false
  })
  @Unique(["chineseName"])
  chineseName: string;

  /**
   * Density of material
   * Unit is g/cm³
   */
  @Column({
    type: "decimal",
    scale: 2,
    nullable: false
  })
  density: number;

  /**
   * Thickness of material
   * Unit is μm
   */
  @Column({
    type: "decimal",
    scale: 2,
    nullable: false
  })
  thickness: number;

  /**
   * Unit price by weight of material
   * Unit is RMB/kg
   */
  @Column({
    type: "decimal",
    scale: 2,
    nullable: false
  })
  unitPrice: number;

  @Column("text")
  remarks: string;

  @OneToMany(type => MaterialDisplay, (display: MaterialDisplay) => display.material)
  displays: MaterialDisplay[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;
}

@Entity()
export class MaterialDisplay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "category_printing_type_id"
  })
  categoryPrintingTypeId: number;

  @ManyToOne(() => CategoryPrintingType)
  @JoinColumn({ name: "category_printing_type_id" })
  categoryPrintingType: CategoryPrintingType;

  @Column({
    name: "category_option_id"
  })
  categoryOptionId: number;

  @ManyToOne(type => CategoryOption)
  @JoinColumn({ name: "category_option_id" })
  categoryOption: CategoryOption;

  @Column({
    name: "material_id"
  })
  materialId: number;

  @ManyToOne(type => Material)
  @JoinColumn({ name: "material_id" })
  material: Material;

  @Column({
    type: "int",
    default: 0
  })
  index: number;

  @Column({
    type: "boolean",
    default: false
  })
  isActive: boolean;
}