import { Test, TestingModule } from "@nestjs/testing";
import { QuotationHistoriesService } from "./quotation-histories.service";

describe("QuotationHistoriesService", () => {
  let service: QuotationHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotationHistoriesService],
    }).compile();

    service = module.get<QuotationHistoriesService>(QuotationHistoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
