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

  it("add 2 customers", async () => {
    // expect(service).toBeDefined();
    const tiers: CustomerTier[] = await customerTiersService.findAll();
    await service.create({
      username: "coryisbest07281@gmail.com",
      password: "qazwsxedcrfv",
      name: "Cory K 1",
      orgName: "Packaging Inc",
      email: "coryisbest07281@gmail.com",
      phone: "(678)-678-8765",
      tier: tiers[0]
    });
    let customers: CustomerWithoutPassword[] = await service.findAll();
    expect(customers.length).toEqual(1);
    expect(customers[0].username).toEqual("coryisbest07281@gmail.com");
    expect(customers[0].tier.id).toEqual(tiers[0].id);
    await service.create({
      username: "coryisbest07282@gmail.com",
      password: "qazwsxedcrfv",
      name: "Cory K 2",
      orgName: "Packaging Inc",
      email: "coryisbest07282@gmail.com",
      phone: "(678)-678-8766",
      tier: tiers[0]
    });

    customers = await service.findAll();
    expect(customers.length).toEqual(2);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
