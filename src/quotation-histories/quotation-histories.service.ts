import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuotationHistoryDto } from "./dto/create-quotation-history.dto";
import { QuotationHistory } from "../entities/quotation-history.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../entities/customer.entity";
import { CustomersService } from "src/customers/customers.service";
import { CategoriesService } from "src/categories/categories.service";

@Injectable()
export class QuotationHistoriesService {
  constructor(
    @InjectRepository(QuotationHistory)
    private quotationHistoryRepository: Repository<QuotationHistory>,

    private customersService: CustomersService,

    private categoriesService: CategoriesService
  ) {}

  async create(customerId: number, createQuotationHistoryDtos: CreateQuotationHistoryDto[]) {
    const customer: Customer | null =  await this.customersService.findOne(customerId);
    if (!customer) {
      throw new NotFoundException(`The customer(${customerId}) was not found.`);
    }
    for (const createQuotationHistoryDto of createQuotationHistoryDtos) {
      createQuotationHistoryDto.categoryAllMappings = await this.categoriesService.findCategoryAllMappings(createQuotationHistoryDto.categoryAllMappings);
    }
    await this.quotationHistoryRepository.save(createQuotationHistoryDtos.map((createQuotationHistoryDto: CreateQuotationHistoryDto) => ({
      customer: customer,
      ...createQuotationHistoryDto
    })))
  }
}
