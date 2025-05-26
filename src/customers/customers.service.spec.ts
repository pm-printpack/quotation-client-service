import { Test, TestingModule } from "@nestjs/testing";
import { CustomersService } from "./customers.service";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppModule } from "../app.module";
import { CustomerTiersService } from "../customer-tiers/customer-tiers.service";
import { CustomerTier } from "../entities/customer-tier.entity";
import { CustomerWithoutPassword } from "../entities/customer.entity";

describe("CustomersService", () => {
  let app: INestApplication;
  let service: CustomersService;
  let customerTiersService: CustomerTiersService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test
      .createTestingModule({
        imports: [AppModule]
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Grab the TypeORM DataSource that Nest created for you
    dataSource = moduleFixture.get<DataSource>(DataSource);
    service = moduleFixture.get<CustomersService>(CustomersService);
    customerTiersService = moduleFixture.get<CustomerTiersService>(CustomerTiersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
