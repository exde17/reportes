import { Injectable } from '@nestjs/common';
import { CreateConsumoMaterialDto } from './dto/create-consumo-material.dto';
import { UpdateConsumoMaterialDto } from './dto/update-consumo-material.dto';
import { ConsumoMaterial } from './entities/consumo-material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from 'src/material/entities/material.entity';

@Injectable()
export class ConsumoMaterialService {
  constructor(
    @InjectRepository(ConsumoMaterial)
    private readonly consumoMaterialRepository: Repository<ConsumoMaterial>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(createConsumoMaterialDto: CreateConsumoMaterialDto) {
    try {
      let dat = [];
      const materials = this.consumoMaterialRepository.create({
        name: createConsumoMaterialDto.name,
        document: createConsumoMaterialDto.document,
        // materials: createConsumoMaterialDto.materials,
        city: createConsumoMaterialDto.city,
        store: createConsumoMaterialDto.store,
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

      return {
        dataTecnico: saveConsumo,
        dataMaterial: dat,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all consumoMaterial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumoMaterial`;
  }

  update(id: number, updateConsumoMaterialDto: UpdateConsumoMaterialDto) {
    return `This action updates a #${id} consumoMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumoMaterial`;
  }
}
