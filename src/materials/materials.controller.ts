import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { MaterialsService } from "./materials.service";
import { QueryMaterialDto } from "./dto/query-material.dto";

@Controller("materials")
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  // @Post()
  // async create(@Body() createMaterialDto: CreateMaterialDto) {
  //   await this.materialsService.create(createMaterialDto);
  // }

  // @Get()
  // async findAll(): Promise<QueryMaterialDto[]> {
  //   return await this.materialsService.findAll();
  // }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.materialsService.findOne(id);
  }
}
