import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryOption, CategoryPrintingType, CategoryProductSubcategory, CategorySuboption } from "../entities/category.entity";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("product-subcategories")
  findAllProductSubcategories(): Promise<CategoryProductSubcategory[]> {
    return this.categoriesService.findAllCategoryProductSubcategories();
  }

  @Get("printing-types")
  findAllPrintingTypes(): Promise<CategoryPrintingType[]> {
    return this.categoriesService.findAllCategoryPrintingTypes();
  }

  @Get("options/:categoryProductSubcategoryId/:categoryPrintingTypeId")
  findCategoryOptions(
    @Param("productionSubcategoryId", ParseIntPipe) categoryProductSubcategoryId: number,
    @Param("categoryPrintingTypeId", ParseIntPipe) categoryPrintingTypeId: number
  ): Promise<CategoryOption[]> {
    return this.categoriesService.findCategoryOptions(categoryProductSubcategoryId, categoryPrintingTypeId);
  }

  @Get("suboptions/:categoryProductSubcategoryId/:categoryPrintingTypeId/:categoryOptionId")
  findCategorySuboptions(
    @Param("productionSubcategoryId", ParseIntPipe) categoryProductSubcategoryId: number,
    @Param("categoryPrintingTypeId", ParseIntPipe) categoryPrintingTypeId: number,
    @Param("categoryOptionId", ParseIntPipe) categoryOptionId: number
  ): Promise<CategorySuboption[]> {
    return this.categoriesService.findCategorySuboptions(categoryProductSubcategoryId, categoryPrintingTypeId, categoryOptionId);
  }
}
