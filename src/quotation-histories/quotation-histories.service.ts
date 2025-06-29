import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuotationHistoryDto } from "./dto/create-quotation-history.dto";
import { QuotationHistory } from "src/entities/quotation-history.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "src/entities/customer.entity";

@Injectable()
export class QuotationHistoriesService {
  constructor(
    @InjectRepository(QuotationHistory)
    private quotationHistoryRepository: Repository<QuotationHistory>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async create(createQuotationHistoryDto: CreateQuotationHistoryDto) {
    const customer: Customer | null =  await this.customerRepository.findOneBy({id: createQuotationHistoryDto.customerId});
    if (!customer) {
      throw new NotFoundException(`The customer(${createQuotationHistoryDto.customerId}) was not found.`);
    }
    // await this.quotationHistoryRepository.insert(
    //   this.quotationHistoryRepository.create({
    //     customer: customer,
    //     ...createQuotationHistoryDto
    //   })
    // );
    await this.quotationHistoryRepository.save({
      customer: customer,
      ...createQuotationHistoryDto
    })
  }
}
