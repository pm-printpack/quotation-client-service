import { Test, TestingModule } from "@nestjs/testing";
import { CustomerTiersService } from "./customer-tiers.service";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppModule } from "../app.module";
import { CustomerTier } from "../entities/customer-tier.entity";

describe("CustomerTiersService", () => {
  let app: INestApplication;
  let service: CustomerTiersService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test
      .createTestingModule({
        imports: [AppModule],
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Grab the TypeORM DataSource that Nest created for you
    dataSource = moduleFixture.get<DataSource>(DataSource);
    service = moduleFixture.get<CustomerTiersService>(CustomerTiersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
