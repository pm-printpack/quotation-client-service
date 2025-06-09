import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrencyCode, ExchangeRate } from "../entities/exchange-rate.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExchangeRatesService {
  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>
  ) {}

  findByCurrencyCode(baseCurrencyCode: CurrencyCode) {
    return this.exchangeRateRepository.findOneBy({baseCurrencyCode: baseCurrencyCode})
  }
}
