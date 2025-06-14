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
   * Unit Price per Square Meter
   * CNY/m²
   */
  unitPricePerSquareMeter: number;

  /**
   * Unit Price per Kelogram
   * CNY/kg
   */
  unitPricePerKg: number;

  /**
   * Weight per square centimeter of material
   * The unit is g/cm²
   */
  weightPerCm2: number;

  remarks?: string;

  displays: QueryMaterialDisplayDto[];
}
