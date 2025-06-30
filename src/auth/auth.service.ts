import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { AuthPaylod } from "./auth.type";
import * as bcrypt from "bcrypt";
import { Customer } from "../entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const customer: Customer | null = await this.customerRepository
      .createQueryBuilder("Customer")
      .addSelect("Customer.password")
      .where("Customer.username = :username", { username: loginDto.username })
      .getOne();
    if (!customer || !(await bcrypt.compare(loginDto.password, customer.password))) {
      throw new UnauthorizedException();
    }
    const payload: AuthPaylod = { sub: customer.id, username: customer.username };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
