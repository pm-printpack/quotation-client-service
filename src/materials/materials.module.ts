import { Module } from "@nestjs/common";
import { MaterialsService } from "./materials.service";
import { MaterialsController } from "./materials.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Material, MaterialDisplay } from "../entities/material.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Material, MaterialDisplay])
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService]
})
export class MaterialsModule {}
