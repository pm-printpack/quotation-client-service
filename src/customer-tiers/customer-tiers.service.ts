import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerTier } from "../entities/customer-tier.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerTiersService {
  constructor(
    @InjectRepository(CustomerTier)
    private customerTierRepository: Repository<CustomerTier>
  ) {}

  findOne(id: number): Promise<CustomerTier | null> {
    return this.customerTierRepository.findOneBy({id});
  }
}
