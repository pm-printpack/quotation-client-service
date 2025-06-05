import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

class Category{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(["name"])
  name: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;
};

@Entity({
  name: "category_product_subcategory"
})
export class CategoryProductSubcategory extends Category {}

@Entity({
  name: "category_printing_type"
})
export class CategoryPrintingType extends Category {}

@Entity({
  name: "category_option"
})
export class CategoryOption extends Category {
  @Column({
    type: "boolean",
    default: false
  })
  isMaterial: boolean;
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

  @ManyToOne(type => CategoryProductSubcategory)
  @JoinColumn({ name: "category_product_subcategory_id" })
  categoryProductSubcategory: CategoryProductSubcategory;

  @Column({
    name: "category_printing_type_id"
  })
  categoryPrintingTypeId: number;

  @ManyToOne(type => CategoryPrintingType)
  @JoinColumn({ name: "category_printing_type_id" })
  categoryPrintingType: CategoryPrintingType;

  @Column({
    name: "category_option_id"
  })
  categoryOptionId: number;

  @ManyToOne(type => CategoryOption)
  @JoinColumn({ name: "category_option_id" })
  categoryOption: CategoryOption;
}

export class UnitPriceConfigurableCategory extends Category {
  /**
   * Unit price of this category
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  unitPrice: number;
}

@Entity({
  name: "category_suboption"
})
export class CategorySuboption extends UnitPriceConfigurableCategory {}

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

  @ManyToOne(type => CategoryProductSubcategory)
  @JoinColumn({ name: "category_product_subcategory_id" })
  categoryProductSubcategory: CategoryProductSubcategory;

  @Column({
    name: "category_printing_type_id"
  })
  categoryPrintingTypeId: number;

  @ManyToOne(type => CategoryPrintingType)
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
    name: "category_suboption_id"
  })
  categorySuboptionId: number;

  @ManyToOne(type => CategorySuboption)
  @JoinColumn({ name: "category_suboption_id" })
  categorySuboption: CategorySuboption;
}