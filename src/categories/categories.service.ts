import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryAllMapping, CategoryOption, CategoryPrintingType, CategoryProductSubcategory, CategoryProductSubcategoryAndCategoryPrintingTypeMapping, CategoryProductSubcategoryAndOptionMapping, CategorySuboption } from "../entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryProductSubcategory)
    private categoryProductSubcategoryRepository: Repository<CategoryProductSubcategory>,

    @InjectRepository(CategoryPrintingType)
    private categoryPrintingTypeRepository: Repository<CategoryPrintingType>,

    @InjectRepository(CategoryOption)
    private categoryOptionRepository: Repository<CategoryOption>,

    @InjectRepository(CategorySuboption)
    private categorySuboptionRepository: Repository<CategorySuboption>,

    @InjectRepository(CategoryAllMapping)
    private categoryAllMappingRepository: Repository<CategoryAllMapping>,

    @InjectRepository(CategoryProductSubcategoryAndCategoryPrintingTypeMapping)
    private categoryProductSubcategoryAndCategoryPrintingTypeMappingRepository: Repository<CategoryProductSubcategoryAndCategoryPrintingTypeMapping>,

    @InjectRepository(CategoryProductSubcategoryAndOptionMapping)
    private categoryProductSubcategoryAndOptionMappingRepository: Repository<CategoryProductSubcategoryAndOptionMapping>
  ) {}

  findAllCategoryProductSubcategories(): Promise<CategoryProductSubcategory[]> {
    return this.categoryProductSubcategoryRepository.find({
      where: {
        isVisible: true
      },
      order: {
        id: "ASC"
      }
    });
  }

  findCategoryProductSubcategoryByName(name: string): Promise<CategoryProductSubcategory | null> {
    return this.categoryProductSubcategoryRepository.findOneBy({name});
  }

  findAllCategoryPrintingTypes(): Promise<CategoryPrintingType[]> {
    return this.categoryPrintingTypeRepository.find({
      order: {
        id: "ASC"
      }
    });
  }

  async findCategoryPrintingTypesByCategoryProductSubcategory(categoryProductSubcategoryId: number): Promise<CategoryPrintingType[]> {
    const mappings: CategoryProductSubcategoryAndCategoryPrintingTypeMapping[] = await this.categoryProductSubcategoryAndCategoryPrintingTypeMappingRepository.find({
      where: {
        categoryProductSubcategoryId: categoryProductSubcategoryId,
        isVisible: true
      },
      order: {
        categoryPrintingTypeId: "ASC"
      }
    });
    return mappings.map(({categoryPrintingType}) => categoryPrintingType);
  }

  async findCategoryOptions(categoryProductSubcategoryId: number, categoryPrintingTypeId: number): Promise<CategoryOption[]> {
    return (await this.categoryProductSubcategoryAndOptionMappingRepository.find({
      order: {
        id: "ASC"
      },
      where: {
        categoryProductSubcategoryId: categoryProductSubcategoryId,
        categoryPrintingTypeId: categoryPrintingTypeId
      },
      relations: ["categoryOption"]
    })).map((mapping: CategoryProductSubcategoryAndOptionMapping) => mapping.categoryOption);
  }

  findCategoryOptionByName(name: string): Promise<CategoryOption | null> {
    return this.categoryOptionRepository.findOne({ where: { name } });
  }

  async findCategorySuboptions(categoryProductSubcategoryId: number, categoryPrintingTypeId: number, categoryOptionId: number): Promise<CategorySuboption[]> {
    return (await this.categoryAllMappingRepository.find({
      order: {
        id: "ASC"
      },
      where: {
        categoryProductSubcategoryId: categoryProductSubcategoryId,
        categoryPrintingTypeId: categoryPrintingTypeId,
        categoryOptionId: categoryOptionId
      },
      relations: ["categorySuboption"]
    })).map((mapping: CategoryAllMapping) => mapping.categorySuboption);
  }

  async findAllCategorySuboptions(categoryProductSubcategoryId: number, categoryPrintingTypeId: number): Promise<Record<number, CategorySuboption[]>> {
    const allMappings: CategoryAllMapping[] = await this.categoryAllMappingRepository.find({
      order: {
        id: "ASC"
      },
      where: {
        categoryProductSubcategoryId: categoryProductSubcategoryId,
        categoryPrintingTypeId: categoryPrintingTypeId,
      },
      relations: ["categoryOption", "categorySuboption"]
    });

    // { [optionId]: [CategorySuboption, CategorySuboption, CategorySuboption, ...] }
    const suboptionsRecord: Record<number, CategorySuboption[]> = {};
    for (const mapping of allMappings) {
      const optionId = mapping.categoryOptionId;
      if (!suboptionsRecord[optionId]) {
        suboptionsRecord[optionId] = [];
      }
      suboptionsRecord[optionId].push(mapping.categorySuboption);
    }
    return suboptionsRecord;
  }
}
