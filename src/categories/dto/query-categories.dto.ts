import { QueryMaterialDto } from "src/materials/dto/query-material.dto";

export class QueryCategorySuboptionDto {
  id: number;
  name: string;
  chineseName: string;
  unitPrice: number;
}

export class QueryCategoryOptionDto {
  id: number;
  name: string;
  suboptions:  QueryCategorySuboptionDto[] | QueryMaterialDto[][];
}
