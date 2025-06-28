import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { CategoryPrintingType, CategoryProductSubcategory, CategorySuboption } from "./category.entity";
import { Material } from "./material.entity";

class DigitalPrintingQuotationHistory {
  /**
   * 印刷宽度（mm）
   */
  @Column()
  printingWidth: string;

  /**
   * 横向印刷数
   */
  @Column()
  horizontalLayoutCount: string;

  /**
   * 每印袋数
   */
  @Column()
  numOfBagsPerImpression: string;

  /**
   * 印刷长度（m）
   */
  @Column()
  printingLength: string;

  /**
   * 印数
   */
  @Column()
  printingQuantity: string;
}

class OffsetPrintingQuotationHistory {
  /**
   * 匹配模数
   */
  @Column()
  numOfMatchedModulus: string;

  /**
   * 匹配周长
   */
  @Column()
  matchedPerimeter: string;

  /**
   * 倍数
   */
  @Column()
  multiple: string;

  /**
   * 印刷用SKU数
   */
  @Column()
  numOfSKUs4Printing: string;

  /**
   * 材料宽度（mm）
   */
  @Column()
  materialWidth: string;

  /**
   * 印刷宽度（mm）
   */
  @Column()
  printingWidth: string;

  /**
   * 印刷长度（m）
   */
  @Column()
  printingLength: string;
}

class GravurePrintingQuotationHistory {
  /**
   * 材料宽度（mm）
   */
  @Column()
  materialWidth: string;

  /**
   * 版长（mm）
   */
  @Column()
  plateLength: string;

  /**
   * 单袋印刷长/mm
   */
  @Column()
  printingLengthPerPackage: string;

  /**
   * 版周/mm
   */
  @Column()
  platePerimeter: string;

  /**
   * 版费（元）
   */
  @Column()
  plateFee: string;
}

export class NewQuotationHistory {
  @Column()
  customerId: number;

  @Column()
  categoryProductSubcategoryId: number;

  @Column()
  categoryPrintingTypeId: number;

  @Column()
  width: string;

  @Column()
  height: string;

  @Column()
  gusset?: string;

  /**
   * number of SKU
   */
  @Column()
  numOfStyles: string;

  /**
   * quantity of per SKU
   */
  @Column()
  quantityPerStyle: string;

  /**
   * total quantity of SKU
   */
  @Column()
  totalQuantity: string;

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
  @Column()
  materialArea: string;

  /**
   * 印刷费（元）
   */
  @Column()
  printingCost: string;

  /**
   * 材料费（元）
   */
  @Column()
  materialCost: string;

  /**
   * 复合费（元）
   */
  @Column()
  laminationCost: string;

  /**
   * 制袋费（元）
   */
  @Column()
  bagMakingCost: string;

  /**
   * 刀模费（元）
   */
  @Column()
  dieCuttingCost: string;

  /**
   * 包装费（元）
   */
  @Column()
  packagingCost: string;

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
