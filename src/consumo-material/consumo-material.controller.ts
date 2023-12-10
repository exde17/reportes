import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumoMaterialService } from './consumo-material.service';
import { CreateConsumoMaterialDto } from './dto/create-consumo-material.dto';
import { UpdateConsumoMaterialDto } from './dto/update-consumo-material.dto';

@Controller('consumo-material')
export class ConsumoMaterialController {
  constructor(private readonly consumoMaterialService: ConsumoMaterialService) {}

  @Post()
  async create(@Body() createConsumoMaterialDto: CreateConsumoMaterialDto) {
    return await this.consumoMaterialService.create(createConsumoMaterialDto);
    
  }

  @Get()
  findAll() {
    return this.consumoMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumoMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumoMaterialDto: UpdateConsumoMaterialDto) {
    return this.consumoMaterialService.update(+id, updateConsumoMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumoMaterialService.remove(+id);
  }
}
