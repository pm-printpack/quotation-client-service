import { Controller, Post, Body } from "@nestjs/common";
import { QuotationHistoriesService } from "./quotation-histories.service";
import { CreateQuotationHistoryDto } from "./dto/create-quotation-history.dto";

@Controller("quotation-histories")
export class QuotationHistoriesController {
  constructor(private readonly quotationHistoriesService: QuotationHistoriesService) {}

  @Post()
  async create(@Body() createQuotationHistoryDto: CreateQuotationHistoryDto) {
    await this.quotationHistoriesService.create(createQuotationHistoryDto);
  }
}
