import { ConsumoMaterial } from 'src/consumo-material/entities/consumo-material.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    name: 'codigo_material',
  })
  codigo: string;

  @Column('text', {
    nullable: false,
    name: 'nombre_material',
  })
  name: string;

  @Column('numeric', {
    nullable: false,
    name: 'cantidad_material',
  })
  quantity: number;

  @Column('text', {
    nullable: false,
    name: 'unidad_medida',
  })
  unit: string;

  @ManyToOne(
    () => ConsumoMaterial,
    (consumoMaterial) => consumoMaterial.materials,
  )
  consumoMaterial: ConsumoMaterial; 

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updateAt: Date;

}
