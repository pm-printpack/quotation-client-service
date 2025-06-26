import { Test, TestingModule } from "@nestjs/testing";
import { QuotationHistoriesController } from "./quotation-histories.controller";
import { QuotationHistoriesService } from "./quotation-histories.service";

describe("QuotationHistoriesController", () => {
  let controller: QuotationHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotationHistoriesController],
      providers: [QuotationHistoriesService],
    }).compile();

    controller = module.get<QuotationHistoriesController>(QuotationHistoriesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
