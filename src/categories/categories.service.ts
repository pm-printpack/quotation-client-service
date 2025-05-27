import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryAllMapping, CategoryOption, CategoryPrintingType, CategoryProductSubcategory, CategoryProductSubcategoryAndOptionMapping, CategorySuboption } from "../entities/category.entity";
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

    @InjectRepository(CategoryProductSubcategoryAndOptionMapping)
    private categoryProductSubcategoryAndOptionMappingRepository: Repository<CategoryProductSubcategoryAndOptionMapping>
  ) {}

  findAllCategoryProductSubcategories(): Promise<CategoryProductSubcategory[]> {
    return this.categoryProductSubcategoryRepository.find();
  }

  findCategoryProductSubcategoryByName(name: string): Promise<CategoryProductSubcategory | null> {
    return this.categoryProductSubcategoryRepository.findOneBy({name});
  }

  findAllCategoryPrintingTypes(): Promise<CategoryPrintingType[]> {
    return this.categoryPrintingTypeRepository.find();
  }

  async findCategoryOptions(categoryProductSubcategoryId: number, categoryPrintingTypeId: number): Promise<CategoryOption[]> {
    return (await this.categoryProductSubcategoryAndOptionMappingRepository.find({
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
      where: {
        categoryProductSubcategoryId: categoryProductSubcategoryId,
        categoryPrintingTypeId: categoryPrintingTypeId,
        categoryOptionId: categoryOptionId
      },
      relations: ["categorySuboption"]
    })).map((mapping: CategoryAllMapping) => mapping.categorySuboption);
  }
}
