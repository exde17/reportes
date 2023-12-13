import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ConsumoMaterialService } from './consumo-material.service';
import { CreateConsumoMaterialDto } from './dto/create-consumo-material.dto';
import { UpdateConsumoMaterialDto } from './dto/update-consumo-material.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'express';


@Controller('consumo-material')
export class ConsumoMaterialController {
  constructor(private readonly consumoMaterialService: ConsumoMaterialService) {}

  @Post()
  @Auth()
  async create(
    @Body() createConsumoMaterialDto: CreateConsumoMaterialDto,
    @GetUser() user: User
    ) {
      // console.log(user.id)
    return await this.consumoMaterialService.create(createConsumoMaterialDto, user);
    
  }

  // @Get()
  // findAll() {
  //   return this.consumoMaterialService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.consumoMaterialService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConsumoMaterialDto: UpdateConsumoMaterialDto) {
  //   return this.consumoMaterialService.update(+id, updateConsumoMaterialDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.consumoMaterialService.remove(+id);
  // }

  // @Get('download')
  // async downloadPdf(@Res() res: Response) {
  //   const data = "Texto de ejemplo"; // Reemplazar con los datos reales
  //   const pdfBuffer = await this.consumoMaterialService.generatePdf(data);

  //   res.set('Content-Type', 'application/pdf');
  //   res.set('Content-Disposition', `attachment; filename="download.pdf"`);
  //   res.end(pdfBuffer);
  // }

  @Get('download')
  async downloadPdf(@Res() res: Response) {
    // const data = await this.getDataFromDatabase(); // tu método para obtener los datos
    const pdfBuffer = await this.consumoMaterialService.generatePdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=download.pdf',
    });

    res.end(pdfBuffer);
  }

  // async getDataFromDatabase() {
  //   return [
  //     { id: 1, name: 'John Doe' },
  //     { id: 2, name: 'Jane Doe' },
  //   ];
  // }
}
