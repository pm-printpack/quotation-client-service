import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CategoryOption, CategoryPrintingType, UnitAreaPriceConfigurableCategory } from "./category.entity";
import { QuotationHistory } from "./quotation-history.entity";

@Entity()
export class Material extends UnitAreaPriceConfigurableCategory {

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
   * The unit is g/cm³
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
   * The unit is μm
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

  @OneToMany(() => MaterialDisplay, (display: MaterialDisplay) => display.material)
  displays: MaterialDisplay[];

  @ManyToMany(() => QuotationHistory, quotationHistory => quotationHistory.materials)
  quotationHistories: QuotationHistory[];
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

  @ManyToOne(() => CategoryOption)
  @JoinColumn({ name: "category_option_id" })
  categoryOption: CategoryOption;

  @Column({
    name: "material_id"
  })
  materialId: number;

  @ManyToOne(() => Material)
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