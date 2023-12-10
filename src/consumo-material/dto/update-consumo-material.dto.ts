import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumoMaterialDto } from './create-consumo-material.dto';

export class UpdateConsumoMaterialDto extends PartialType(CreateConsumoMaterialDto) {}
