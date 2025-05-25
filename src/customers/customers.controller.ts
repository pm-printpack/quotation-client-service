import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CustomerWithoutPassword } from "../entities/customer.entity";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
}
