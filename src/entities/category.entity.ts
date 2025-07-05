import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { QuotationHistory } from "./quotation-history.entity";

class Category{
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

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;
};

@Entity({
  name: "category_product_subcategory"
})
export class CategoryProductSubcategory extends Category {
  @Column({
    type: "boolean",
    default: false
  })
  hasGusset: boolean;

  @Column({
    type: "boolean",
    default: false
  })
  isVisible: boolean;

  @OneToMany(() => CategoryProductSubcategoryAndCategoryPrintingTypeMapping, mapping => mapping.categoryProductSubcategory)
  printingTypeMappings: CategoryProductSubcategoryAndCategoryPrintingTypeMapping[];

  @OneToMany(() => QuotationHistory, quotationHistory => quotationHistory.categoryProductSubcategory)
  quotationHistories: QuotationHistory[];
}

@Entity({
  name: "category_printing_type"
})
export class CategoryPrintingType extends Category {
  @OneToMany(() => CategoryProductSubcategoryAndCategoryPrintingTypeMapping, mapping => mapping.categoryPrintingType)
  productSubcategoryMappings: CategoryProductSubcategoryAndCategoryPrintingTypeMapping[];

  @OneToMany(() => QuotationHistory, quotationHistory => quotationHistory.categoryPrintingType)
  quotationHistories: QuotationHistory[];
}

@Entity({
  name: "category_product_subcategory_and_category_printing_type_mapping"
})
export class CategoryProductSubcategoryAndCategoryPrintingTypeMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "category_product_subcategory_id"
  })
  categoryProductSubcategoryId: number;

  @ManyToOne(() => CategoryProductSubcategory, categoryProductSubcategory => categoryProductSubcategory.printingTypeMappings)
  categoryProductSubcategory: CategoryProductSubcategory;

  @Column({
    name: "category_printing_type_id"
  })
  categoryPrintingTypeId: number;

  @ManyToOne(() => CategoryPrintingType, categoryPrintingType => categoryPrintingType.productSubcategoryMappings, {eager: true})
  categoryPrintingType: CategoryPrintingType;

  @Column({
    type: "boolean",
    default: false
  })
  isVisible: boolean;
}

@Entity({
  name: "category_option"
})
export class CategoryOption extends Category {
  @Column({
    type: "boolean",
    default: false
  })
  isMaterial: boolean;

  @Column({
    type: "boolean",
    default: false
  })
  isRequired: boolean;
}

@Entity({
  name: "category_product_subcategory_and_option_mapping"
})
export class CategoryProductSubcategoryAndOptionMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "category_product_subcategory_id"
  })
  categoryProductSubcategoryId: number;

  @ManyToOne(() => CategoryProductSubcategory)
  @JoinColumn({ name: "category_product_subcategory_id" })
  categoryProductSubcategory: CategoryProductSubcategory;

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
}

export class UnitAreaPriceConfigurableCategory extends Category {
  /**
   * Unit Price per Square Meter
   * CNY/m²
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  unitPricePerSquareMeter: number;
}

@Entity({
  name: "category_suboption"
})
export class CategorySuboption extends UnitAreaPriceConfigurableCategory {}

@Entity({
  name: "category_all_mapping"
})
export class CategoryAllMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "category_product_subcategory_id"
  })
  categoryProductSubcategoryId: number;

  @ManyToOne(() => CategoryProductSubcategory)
  @JoinColumn({ name: "category_product_subcategory_id" })
  categoryProductSubcategory: CategoryProductSubcategory;

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
    name: "category_suboption_id"
  })
  categorySuboptionId: number;

  @ManyToOne(() => CategorySuboption)
  @JoinColumn({ name: "category_suboption_id" })
  categorySuboption: CategorySuboption;

  @Column({
    type: "boolean",
    default: false
  })
  isVisible: boolean;

  @ManyToMany(() => QuotationHistory, quotationHistory => quotationHistory.categoryAllMappings)
  quotationHistories: QuotationHistory[];
}