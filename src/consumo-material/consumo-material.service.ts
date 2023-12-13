import { Injectable } from '@nestjs/common';
import { CreateConsumoMaterialDto } from './dto/create-consumo-material.dto';
import { UpdateConsumoMaterialDto } from './dto/update-consumo-material.dto';
import { ConsumoMaterial } from './entities/consumo-material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from 'src/material/entities/material.entity';
import { User } from 'src/user/entities/user.entity';
import { PDFDocument, rgb } from 'pdf-lib';
import * as puppeteer from 'puppeteer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
const uuid = require('uuid');

@Injectable()
export class ConsumoMaterialService {
  constructor(
    @InjectRepository(ConsumoMaterial)
    private readonly consumoMaterialRepository: Repository<ConsumoMaterial>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(createConsumoMaterialDto: CreateConsumoMaterialDto, user: User) {
    try {
      let dat = [];
      const materials = this.consumoMaterialRepository.create({
        name: createConsumoMaterialDto.name,
        document: createConsumoMaterialDto.document,
        // materials: createConsumoMaterialDto.materials,
        city: createConsumoMaterialDto.city,
        store: createConsumoMaterialDto.store,
        idTecnico: uuid.stringify(uuid.parse(user.id)),
      });

      const saveConsumo = await this.consumoMaterialRepository.save(materials);

      for (let i of createConsumoMaterialDto.materials) {
        const material = this.materialRepository.create({
          codigo: i.codigo,
          name: i.name,
          quantity: i.quantity,
          unit: i.unit,
          consumoMaterial: saveConsumo,
        });

        const dato = await this.materialRepository.save(material);

        dat.push({
          codigo: dato.codigo,
          name: dato.name,
          quantity: dato.quantity,
          unit: dato.unit,
        });
      }

      // console.log(user)

      return {
        dataTecnico: saveConsumo,
        dataMaterial: dat,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // findAll() {
  //   return `This action returns all consumoMaterial`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} consumoMaterial`;
  // }

  // update(id: number, updateConsumoMaterialDto: UpdateConsumoMaterialDto) {
  //   return `This action updates a #${id} consumoMaterial`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consumoMaterial`;
  // }

  // async generatePdf(data: string): Promise<Buffer> {
  //   // Crear un nuevo documento PDF
  //   const pdfDoc = await PDFDocument.create();

  //   // Añadir una página al PDF
  //   const page = pdfDoc.addPage();

  //   // Escribir texto en la página
  //   const { width, height } = page.getSize();
  //   const fontSize = 30;
  //   page.drawText(data, {
  //     x: 50,
  //     y: height - 4 * fontSize,
  //     size: fontSize,
  //     color: rgb(0, 0, 0),
  //   });

  //   // Serializar el PDFDocument a bytes (un Buffer de Node.js)
  //   const pdfBytes = await pdfDoc.save();

  //   return Buffer.from(pdfBytes);
  // }

  
    async generatePdf(): Promise<Buffer> {

      const datos = [
        { nombre: 'John Doe', documento: '123456', ciudad: 'Ciudad X', bodega: 'Bodega A' },
        // ... más objetos
      ];
      const materiales = [
        { codigo: '001', nombre: 'Material 1', cantidad: 10, unidad: 'kg' },
        // ... más objetos
      ];
      const templateHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'util', 'template.hbs'), 'utf8');

      const template = handlebars.compile(templateHtml);
      const html = template({ datos, materiales });
  
      const browser = await puppeteer.launch({
        headless: "new"
      });
      const page = await browser.newPage();
  
      await page.setContent(html);
  
      const pdfBuffer = await page.pdf({ format: 'A4' });
  
      await browser.close();
  
      return pdfBuffer;
    }
  
}
