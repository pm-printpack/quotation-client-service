import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { AuthPaylod } from "./auth.type";
import * as bcrypt from "bcrypt";
import { CustomersService } from "../customers/customers.service";
import { Customer } from "../entities/customer.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const customer: Customer | null = await this.customersService.findByUsername(loginDto.username);
    if (!customer || !(await bcrypt.compare(loginDto.password, customer.password))) {
      throw new UnauthorizedException();
    }
    const payload: AuthPaylod = { sub: customer.id, username: customer.username };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }
}
