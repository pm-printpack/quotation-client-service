import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryAllMapping, CategoryOption, CategoryPrintingType, CategoryProductSubcategory, CategoryProductSubcategoryAndCategoryPrintingTypeMapping, CategoryProductSubcategoryAndOptionMapping, CategorySuboption } from "../entities/category.entity";
import { MaterialsModule } from "../materials/materials.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryProductSubcategory,
      CategoryPrintingType,
      CategoryOption,
      CategorySuboption,
      CategoryAllMapping,
      CategoryProductSubcategoryAndCategoryPrintingTypeMapping,
      CategoryProductSubcategoryAndOptionMapping
    ]),
    MaterialsModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
