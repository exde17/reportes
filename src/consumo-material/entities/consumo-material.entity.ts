import { Material } from 'src/material/entities/material.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ConsumoMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    name: 'nombre_tecnico',
  })
  name: string;

  @Column('text', {
    nullable: false,
    name: 'documento_tecnico',
  })
  document: string;

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

  @OneToMany(() => Material, (material) => material.consumoMaterial)
  materials: Material[];

  @Column('text', {
    nullable: false,
  })
  city: string;

  @Column('text', {
    nullable: false,
  })
  store: string;

  @Column('text',{
    nullable: true,
    name: 'id_tecnico'
  })
  idTecnico: User
}
