import { Module } from "@nestjs/common";
import { ExchangeRatesService } from "./exchange-rates.service";
import { ExchangeRatesController } from "./exchange-rates.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExchangeRate } from "../entities/exchange-rate.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRate])
  ],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
