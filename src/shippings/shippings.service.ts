import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shipping, ShippingType } from "../entities/shipping.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShippingsService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>
  ) {}

  findAll(): Promise<Shipping[]> {
    return this.shippingRepository.find();
  }

  findOneByType(type: ShippingType): Promise<Shipping | null> {
    return this.shippingRepository.findOneBy({ type: type });
  }
}
