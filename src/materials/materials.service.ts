import { Injectable } from "@nestjs/common";
import { Material, MaterialDisplay } from "../entities/material.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,

    @InjectRepository(MaterialDisplay)
    private materialDisplayRepository: Repository<MaterialDisplay>
  ) {}

  findAllMaterials(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  findOne(id: number): Promise<Material | null> {
    return this.materialRepository.findOneBy({id});
  }

  findMaterialDisplaysByMaterialId(materialId: number): Promise<MaterialDisplay[]> {
    return this.materialDisplayRepository.find({
      where: {materialId: materialId},
      relations: ["categoryPrintingType", "categoryOption", "material"]
    });
  }

  async findAllMaterialByCategoryPrintingType(categoryPrintingTypeId: number): Promise<Record<number, Material[][]>> {
    const displays = await this.materialDisplayRepository.find({
      order: {
        id: "ASC"
      },
      where: {
        isActive: true,
        categoryPrintingTypeId: categoryPrintingTypeId
      },
      relations: ["material"]
    });

    // { [optionId]: [Material[], Material[], Material[], ...] }
    const materialsRecord: Record<number, Material[][]> = {};
    for (const d of displays) {
      if (!materialsRecord[d.categoryOptionId]) {
        materialsRecord[d.categoryOptionId] = [];
      }
      if (!materialsRecord[d.categoryOptionId][d.index]) {
        materialsRecord[d.categoryOptionId][d.index] = [];
      }
      if (!materialsRecord[d.categoryOptionId][d.index].find(({id}) => id === d.material.id)) { // remove duplicated materials in the same index
        materialsRecord[d.categoryOptionId][d.index].push({
          ...d.material,
          displays: [d]
        });
      }
    }
    return materialsRecord;
  }
}
