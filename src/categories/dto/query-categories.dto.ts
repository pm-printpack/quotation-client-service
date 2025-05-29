export class QueryCategorySuboptionDto {
  id: number;
  name: string;
}

export class QueryMaterialDto {
  id: number;
  name: string;
}

export class QueryCategoryOptionDto {
  id: number;
  name: string;
  suboptions:  QueryCategorySuboptionDto | QueryMaterialDto[];
}
