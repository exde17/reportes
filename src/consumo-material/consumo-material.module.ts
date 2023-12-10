import { Module } from '@nestjs/common';
import { ConsumoMaterialService } from './consumo-material.service';
import { ConsumoMaterialController } from './consumo-material.controller';
import { ConsumoMaterial } from './entities/consumo-material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/material/entities/material.entity';

@Module({
  controllers: [ConsumoMaterialController],
  providers: [ConsumoMaterialService],
  exports: [ConsumoMaterialService],
  imports: [TypeOrmModule.forFeature([ConsumoMaterial, Material])]
})
export class ConsumoMaterialModule {}
