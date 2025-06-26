import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { CategoryPrintingType, CategoryProductSubcategory, CategorySuboption } from "./category.entity";
import { Material } from "./material.entity";

class DigitalPrintingQuotationHistory {
  /**
   * 印刷宽度（mm）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  printingWidth: number;

  /**
   * 横向印刷数
   */
  @Column()
  horizontalLayoutCount: number;

  /**
   * 每印袋数
   */
  @Column()
  numOfBagsPerImpression: number;

  /**
   * 印刷长度（m）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  printingLength: number;

  /**
   * 印数
   */
  @Column()
  printingQuantity: number;
}

class OffsetPrintingQuotationHistory {
  /**
   * 匹配模数
   */
  @Column()
  numOfMatchedModulus: number;

  /**
   * 匹配周长
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  matchedPerimeter: number;

  /**
   * 倍数
   */
  @Column()
  multiple: number;

  /**
   * 印刷用SKU数
   */
  @Column()
  numOfSKUs4Printing: number;

  /**
   * 材料宽度（mm）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  materialWidth: number;

  /**
   * 印刷宽度（mm）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  printingWidth: number;

  /**
   * 印刷长度（m）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  printingLength: number;
}

class GravurePrintingQuotationHistory {
  /**
   * 材料宽度（mm）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  materialWidth: number;

  /**
   * 版长（mm）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  plateLength: number;

  /**
   * 单袋印刷长/mm
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  printingLengthPerPackage: number;

  /**
   * 版周/mm
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  platePerimeter: number;

  /**
   * 版费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  plateFee: number;
}

export class NewQuotationHistory {
  @Column()
  customerId: number;

  @Column()
  categoryProductSubcategoryId: number;

  @Column()
  categoryPrintingTypeId: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  width: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  height: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  gusset?: number;

  /**
   * number of SKU
   */
  @Column()
  numOfStyles: number;

  /**
   * quantity of per SKU
   */
  @Column()
  quantityPerStyle: number;

  /**
   * total quantity of SKU
   */
  @Column()
  totalQuantity: number;

  @ManyToMany(() => CategorySuboption, categorySuboption => categorySuboption.quotationHistories)
  @JoinTable()
  categorySuboptions: CategorySuboption[];

  @ManyToMany(() => CategorySuboption, categorySuboption => categorySuboption.quotationHistories)
  @JoinTable()
  materials: Material[];

  /**
   * 成本总价（元）
   */
  @Column({
    name: "total_cost_in_CNY",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  totalCostInCNY: number;

  /**
   * 总价（元）
   */
  @Column({
    name: "total_price_in_CNY",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  totalPriceInCNY: number;

  /**
   * 总价（美元）
   */
  @Column({
    name: "total_price_in_USD",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  totalPriceInUSD: number;

  /**
   * 记录时的汇率，1美元兑多少RMB
   */
  @Column({
    name: "exchange_rate_USD_to_CNY",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  exchangeRateUSDToCNY: number;

  /**
   * 材料面积（㎡）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  materialArea: number;

  /**
   * 印刷费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  printingCost: number;

  /**
   * 材料费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: false
  })
  materialCost: number;

  /**
   * 复合费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 6,
    nullable: false
  })
  laminationCost: number;

  /**
   * 制袋费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  bagMakingCost: number;

  /**
   * 刀模费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  dieCuttingCost: number;

  /**
   * 包装费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  packagingCost: number;

  /**
   * 人工费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  laborCost: number;

  /**
   * 文件处理费（元）
   */
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  fileProcessingFee: number;

  @Column(() => DigitalPrintingQuotationHistory)
  digitalPrinting?: DigitalPrintingQuotationHistory;

  @Column(() => OffsetPrintingQuotationHistory)
  offsetPrinting?: OffsetPrintingQuotationHistory;

  @Column(() => GravurePrintingQuotationHistory)
  gravurePrinting?: GravurePrintingQuotationHistory;
}

@Entity()
export class QuotationHistory extends NewQuotationHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Customer, customer => customer.quotationHistories, {eager: true})
  customer: Customer;

  @ManyToOne(type => CategoryProductSubcategory, categoryProductSubcategory => categoryProductSubcategory.quotationHistories, {eager: true})
  categoryProductSubcategory: CategoryProductSubcategory;

  @ManyToOne(type => CategoryPrintingType, categoryPrintingType => categoryPrintingType.quotationHistories, {eager: true})
  categoryPrintingType: CategoryPrintingType;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;
}
