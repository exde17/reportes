import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService],
  imports: [TypeOrmModule.forFeature([Material])]
})
export class MaterialModule {}
