import { QueryMaterialDisplayDto } from "./query-material-display.dto";

export class QueryMaterialDto {
  id: number;
  name: string;
  chineseName: string;

  /**
   * Density of material
   * Unit is g/cm³
   */
  density: number;

  /**
   * Thickness of material
   * Unit is μm
   */
  thickness: number;

  /**
   * Unit price by weight of material
   * Unit is RMB/kg
   */
  unitPrice: number;

  remarks?: string;

  displays: QueryMaterialDisplayDto[];
}
