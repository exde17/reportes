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
import * as pdf from 'html-pdf';


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
        name: user.firstName + ' ' + user.lastName, //createConsumoMaterialDto.name,
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

  // async generatePdf(user: User): Promise<Buffer> {
  //   try {
     
  //     const datos = await this.consumoMaterialRepository.findOne({
  //       where: { idTecnico: uuid.stringify(uuid.parse(user.id)) },
  //     });
  //     if (!datos) {
  //       throw new Error(
  //         'No se encontró ConsumoMaterial con el id proporcionado',
  //       );
  //     }

  //     console.log('el id de el consumo: ', datos);
  //     const materiales = await this.materialRepository.find({
  //       where: {
  //         consumoMaterial: { idTecnico: uuid.stringify(uuid.parse(user.id)) },
  //       },
  //     });

  //     if (materiales.length === 0) {
  //       throw new Error('No se encontró Material con el id proporcionado');
  //     }
  //     const templateHtml = fs.readFileSync(
  //       path.join(__dirname, '..', '..', 'src', 'util', 'template.hbs'),
  //       'utf8',
  //     );

  //     const template = handlebars.compile(templateHtml);
  //     const html = template({ datos, materiales });

  //     const browser = await puppeteer.launch({
  //       headless: 'new',
  //     });
  //     const page = await browser.newPage();

  //     await page.setContent(html);

  //     const pdfBuffer = await page.pdf({ format: 'A4' });

  //     await browser.close();

  //     return pdfBuffer;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

//   const fs = require('fs');
// const path = require('path');
// const handlebars = require('handlebars');
// const uuid = require('uuid');
// const pdf = require('html-pdf');

async generatePdf(user: User): Promise<Buffer> {
    try {
        const datos = await this.consumoMaterialRepository.findOne({
            where: { idTecnico: uuid.stringify(uuid.parse(user.id)) },
        });
        if (!datos) {
            throw new Error('No se encontró ConsumoMaterial con el id proporcionado');
        }

        console.log('el id de el consumo: ', datos);
        const materiales = await this.materialRepository.find({
            where: {
                consumoMaterial: { idTecnico: uuid.stringify(uuid.parse(user.id)) },
            },
        });

        if (materiales.length === 0) {
            throw new Error('No se encontró Material con el id proporcionado');
        }

        const templateHtml = fs.readFileSync(
            path.join(__dirname, '..', '..', 'src', 'util', 'template.hbs'),
            'utf8',
        );

        const template = handlebars.compile(templateHtml);
        const html = template({ datos, materiales });

        const options = { format: 'A4' };

        return new Promise((resolve, reject) => {
            pdf.create(html, options).toBuffer(function(err, buffer) {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });
    } catch (error) {
        console.log(error);
        throw error; // Es mejor lanzar el error de nuevo para manejarlo más arriba en la cadena de llamadas
    }
}

}
