import { Controller, Post, Body, Param, ParseIntPipe } from "@nestjs/common";
import { QuotationHistoriesService } from "./quotation-histories.service";
import { CreateQuotationHistoryDto } from "./dto/create-quotation-history.dto";

@Controller("quotation-histories")
export class QuotationHistoriesController {
  constructor(private readonly quotationHistoriesService: QuotationHistoriesService) {}

  @Post("/:customerId")
  async create(@Param("customerId", ParseIntPipe) customerId: number, @Body() createQuotationHistoryDtos: CreateQuotationHistoryDto[]) {
    await this.quotationHistoriesService.create(customerId, createQuotationHistoryDtos);
  }
}
