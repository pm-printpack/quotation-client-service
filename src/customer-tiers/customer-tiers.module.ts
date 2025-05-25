import { Module } from "@nestjs/common";
import { CustomerTiersService } from "./customer-tiers.service";
import { CustomerTiersController } from "./customer-tiers.controller";
import { CustomerTier } from "../entities/customer-tier.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerTier])],
  controllers: [CustomerTiersController],
  providers: [CustomerTiersService],
  exports: [CustomerTiersService]
})
export class CustomerTiersModule {}
