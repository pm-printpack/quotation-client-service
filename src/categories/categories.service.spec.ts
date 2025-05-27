import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppModule } from "../app.module";

describe("CategoriesService", () => {
  let app: INestApplication;
  let service: CategoriesService;
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
    service = moduleFixture.get<CategoriesService>(CategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
