import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CategoryOption, CategoryPrintingType, UnitPriceConfigurableCategory } from "./category.entity";

@Entity()
export class Material extends UnitPriceConfigurableCategory {

  /**
   * Unit Price per Kelogram
   * CNY/kg
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  unitPricePerKg: number;

  /**
   * Density of material
   * Unit is g/cm³
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  density: number;

  /**
   * Weight per square centimeter of material
   * The unit is g/cm²
   */
  @Column({
    type: "decimal",
    precision: 12,
    scale: 6,
    nullable: false
  })
  weightPerCm2: number;

  /**
   * Thickness of material
   * Unit is μm
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  thickness: number;

  @Column("text")
  remarks: string;

  @OneToMany(type => MaterialDisplay, (display: MaterialDisplay) => display.material)
  displays: MaterialDisplay[];
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