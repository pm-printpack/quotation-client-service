import { Module } from "@nestjs/common";
import { QuotationHistoriesService } from "./quotation-histories.service";
import { QuotationHistoriesController } from "./quotation-histories.controller";
import { QuotationHistory } from "../entities/quotation-history.entity";
import { Customer } from "../entities/customer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuotationHistory, Customer])
  ],
  controllers: [QuotationHistoriesController],
  providers: [QuotationHistoriesService],
})
export class QuotationHistoriesModule {}
