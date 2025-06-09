import { Controller, Get, Param, ParseEnumPipe } from "@nestjs/common";
import { ExchangeRatesService } from "./exchange-rates.service";
import { CurrencyCode } from "../entities/exchange-rate.entity";

@Controller("exchange-rates")
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get(":currencyCode")
  findByCurrencyCode(@Param("currencyCode", new ParseEnumPipe(CurrencyCode)) currencyCode: CurrencyCode) {
    return this.exchangeRatesService.findByCurrencyCode(currencyCode);
  }
}
