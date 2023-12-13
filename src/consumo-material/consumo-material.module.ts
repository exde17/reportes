import { Module } from '@nestjs/common';
import { ConsumoMaterialService } from './consumo-material.service';
import { ConsumoMaterialController } from './consumo-material.controller';
import { ConsumoMaterial } from './entities/consumo-material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/material/entities/material.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [ConsumoMaterialController],
  providers: [ConsumoMaterialService],
  exports: [ConsumoMaterialService],
  imports: [TypeOrmModule.forFeature([ConsumoMaterial, Material,User]),
    UserModule
            
]
})
export class ConsumoMaterialModule {}
