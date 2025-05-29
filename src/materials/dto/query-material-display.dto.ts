import { CategoryOption, CategoryPrintingType } from "../../entities/category.entity";
import { Material } from "../../entities/material.entity";

export class QueryMaterialDisplayDto {
  id: number;
  categoryPrintingType: CategoryPrintingType;
  categoryOption: CategoryOption;
  material: Material
  isActive: boolean;
  index: number;
}
