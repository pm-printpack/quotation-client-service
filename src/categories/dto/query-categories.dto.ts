import { QueryMaterialDto } from "../../materials/dto/query-material.dto";

export class QueryCategorySuboptionDto {
  id: number;
  name: string;
  chineseName: string;

  /**
   * Unit Price per Square Meter
   * CNY/m²
   */
  unitPricePerSquareMeter: number;
}

export class QueryCategoryOptionDto {
  id: number;
  name: string;
  suboptions:  QueryCategorySuboptionDto[] | QueryMaterialDto[][];
}
