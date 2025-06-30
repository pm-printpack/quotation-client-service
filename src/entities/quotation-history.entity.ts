import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { CategoryAllMapping, CategoryPrintingType, CategoryProductSubcategory } from "./category.entity";
import { Material } from "./material.entity";

class DigitalPrintingQuotationHistory {
  /**
   * 印刷宽度（mm）
   */
  @Column({ nullable: true })
  printingWidth?: string;

  /**
   * 横向印刷数
   */
  @Column({ nullable: true })
  horizontalLayoutCount?: string;

  /**
   * 每印袋数
   */
  @Column({ nullable: true })
  numOfBagsPerPrinting?: string;

  /**
   * 印刷长度（m）
   */
  @Column({ nullable: true })
  printingLength?: string;

  /**
   * 印数
   */
  @Column({ nullable: true })
  printingQuantity?: string;
}

class OffsetPrintingQuotationHistory {
  /**
   * 匹配模数
   */
  @Column({ nullable: true })
  numOfMatchedModulus?: string;

  /**
   * 匹配周长
   */
  @Column({ nullable: true })
  matchedPerimeter?: string;

  /**
   * 倍数
   */
  @Column({ nullable: true })
  multiple?: string;

  /**
   * 印刷用SKU数
   */
  @Column({ nullable: true })
  numOfSKUs4Printing?: string;

  /**
   * 材料宽度（mm）
   */
  @Column({ nullable: true })
  materialWidth?: string;

  /**
   * 印刷宽度（mm）
   */
  @Column({ nullable: true })
  printingWidth?: string;

  /**
   * 印刷长度（m）
   */
  @Column({ nullable: true })
  printingLength?: string;
}

class GravurePrintingQuotationHistory {
  /**
   * 材料宽度（mm）
   */
  @Column({ nullable: true })
  materialWidth?: string;

  /**
   * 版长（mm）
   */
  @Column({ nullable: true })
  plateLength?: string;

  /**
   * 单袋印刷长/mm
   */
  @Column({ nullable: true })
  printingLengthPerPackage?: string;

  /**
   * 版周/mm
   */
  @Column({ nullable: true })
  platePerimeter?: string;

  /**
   * 版费（元）
   */
  @Column({ nullable: true })
  plateFee?: string;
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

  @ManyToMany(() => CategoryAllMapping, categoryAllMapping => categoryAllMapping.quotationHistories)
  @JoinTable({ name: "quotation_history_and_category_all_mapping" })
  categoryAllMappings: CategoryAllMapping[];

  @ManyToMany(() => Material, material => material.quotationHistories)
  @JoinTable({ name: "quotation_history_and_material" })
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
