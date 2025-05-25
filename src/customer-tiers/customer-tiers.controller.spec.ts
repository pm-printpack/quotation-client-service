import { Test, TestingModule } from "@nestjs/testing";
import { CustomerTiersController } from "./customer-tiers.controller";
import { CustomerTiersService } from "./customer-tiers.service";

describe("CustomerTiersController", () => {
  let controller: CustomerTiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerTiersController],
      providers: [CustomerTiersService],
    }).compile();

    controller = module.get<CustomerTiersController>(CustomerTiersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
