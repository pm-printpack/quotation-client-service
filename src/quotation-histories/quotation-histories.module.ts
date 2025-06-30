import { Module } from "@nestjs/common";
import { QuotationHistoriesService } from "./quotation-histories.service";
import { QuotationHistoriesController } from "./quotation-histories.controller";
import { QuotationHistory } from "../entities/quotation-history.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomersService } from "src/customers/customers.service";
import { CategoriesService } from "src/categories/categories.service";
import { CategoriesModule } from "src/categories/categories.module";
import { CustomersModule } from "src/customers/customers.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuotationHistory]),
    CustomersModule,
    CategoriesModule
  ],
  controllers: [QuotationHistoriesController],
  providers: [QuotationHistoriesService],
})
export class QuotationHistoriesModule {}
