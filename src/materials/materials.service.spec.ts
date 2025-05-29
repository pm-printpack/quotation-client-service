import { Test, TestingModule } from "@nestjs/testing";
import { MaterialsService } from "./materials.service";
import { AppModule } from "../app.module";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Material, MaterialDisplay } from "../entities/material.entity";
import { CategoryOption, CategoryPrintingType, CategoryProductSubcategory } from "../entities/category.entity";
import { CategoriesService } from "../categories/categories.service";
import { QueryMaterialDisplayDto } from "./dto/query-material-display.dto";

describe("MaterialsService", () => {
  let app: INestApplication;
  let service: MaterialsService;
  let categoriesService: CategoriesService;
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
    service = moduleFixture.get<MaterialsService>(MaterialsService);
    categoriesService = moduleFixture.get<CategoriesService>(CategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
