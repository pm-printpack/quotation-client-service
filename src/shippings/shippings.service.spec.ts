import { Test, TestingModule } from "@nestjs/testing";
import { ShippingsService } from "./shippings.service";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppModule } from "../app.module";
import { Shipping, ShippingType } from "../entities/shipping.entity";

describe("ShippingsService", () => {
  let app: INestApplication;
  let service: ShippingsService;
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
    service = moduleFixture.get<ShippingsService>(ShippingsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
