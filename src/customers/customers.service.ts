import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer, CustomerWithoutPassword } from "../entities/customer.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) {}

  async findOne(id: number): Promise<Customer | null> {
    return this.customerRepository.findOneBy({id});
  }
}
