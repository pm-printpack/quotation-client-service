import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { CustomerTiersService } from "./customer-tiers.service";

@Controller("customer-tiers")
export class CustomerTiersController {
  constructor(private readonly customerTiersService: CustomerTiersService) {}
}
