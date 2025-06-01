import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoryOption, CategoryPrintingType, CategoryProductSubcategory, CategorySuboption } from "../entities/category.entity";
import { QueryCategoryOptionDto } from "./dto/query-categories.dto";
import { MaterialsService } from "../materials/materials.service";
import { QueryMaterialDisplayDto } from "src/materials/dto/query-material-display.dto";
import { Material, MaterialDisplay } from "src/entities/material.entity";

@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly materialService: MaterialsService
  ) {}

  @Get("product-subcategories")
  findAllProductSubcategories(): Promise<CategoryProductSubcategory[]> {
    return this.categoriesService.findAllCategoryProductSubcategories();
  }

  @Get("printing-types")
  findAllPrintingTypes(): Promise<CategoryPrintingType[]> {
    return this.categoriesService.findAllCategoryPrintingTypes();
  }

  @Get("options/:categoryProductSubcategoryId/:categoryPrintingTypeId")
  async findCategoryOptions(
    @Param("categoryProductSubcategoryId", ParseIntPipe) categoryProductSubcategoryId: number,
    @Param("categoryPrintingTypeId", ParseIntPipe) categoryPrintingTypeId: number
  ): Promise<QueryCategoryOptionDto[]> {
    const categoryOptions: CategoryOption[] = await this.categoriesService.findCategoryOptions(categoryProductSubcategoryId, categoryPrintingTypeId);
    const displaysRecord: Record<number, Material[][]> = await this.materialService.findAllMaterialByCategoryPrintingType(categoryPrintingTypeId);
    const suboptionsRecord: Record<number, CategorySuboption[]> = await this.categoriesService.findAllCategorySuboptions(categoryProductSubcategoryId, categoryPrintingTypeId);
    return categoryOptions.map((option: CategoryOption) => {
      if (option.isMaterial) {
        return {
          ...option,
          suboptions: displaysRecord[option.id] || [[]]
        };
      } else {
        return {
          ...option,
          suboptions: suboptionsRecord[option.id] || []
        };
      }
    });
  }
}
