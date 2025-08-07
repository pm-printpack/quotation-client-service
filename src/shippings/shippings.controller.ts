import { Controller, Get } from "@nestjs/common";
import { ShippingsService } from "./shippings.service";
import { ShippingType } from "../entities/shipping.entity";

@Controller("shippings")
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}

  @Get()
  findAll() {
    return this.shippingsService.findAll();
  }
}
