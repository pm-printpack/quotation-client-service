import { Injectable } from "@nestjs/common";
import { Material, MaterialDisplay } from "../entities/material.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CategoryOption, CategoryPrintingType } from "src/entities/category.entity";
import { QueryMaterialDto } from "./dto/query-material.dto";
import { QueryMaterialDisplayDto } from "./dto/query-material-display.dto";

@Injectable()
export class MaterialsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Material)
    private materialRepository: Repository<Material>,

    @InjectRepository(MaterialDisplay)
    private materialDisplayRepository: Repository<MaterialDisplay>
  ) {}

  findAllMaterials(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  async findAll(): Promise<QueryMaterialDto[]> {
    const queryMaterialDto: QueryMaterialDto[] = [];
    const materials: Material[] = await this.materialRepository.find({
      order: {
        id: "ASC"
      }
    });
    const MaterialDisplayMatrix: MaterialDisplay[][] = await Promise.all(materials.map(({id}) => this.findMaterialDisplaysByMaterialId(id)));
    for (let i: number = 0; i < materials.length; ++i) {
      queryMaterialDto[i] = {
        ...materials[i],
        displays: MaterialDisplayMatrix[i]
      };
    }
    return queryMaterialDto;
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

  async findAllMaterialByCategoryPrintingType(categoryPrintingTypeId: number): Promise<Record<number, Material[]>> {
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

    const displaysRecord: Record<number, Material[]> = {};
    for (const d of displays) {
      if (!displaysRecord[d.categoryOptionId]) {
        displaysRecord[d.categoryOptionId] = [];
      }
      displaysRecord[d.categoryOptionId].push(d.material);
    }
    return displaysRecord;
  }
}
