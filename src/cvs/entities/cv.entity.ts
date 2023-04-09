import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';
@Entity('cv')
export class Cv extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column()
  name:string;
  @Column()
  firstName:string;
  @Column()
  age: number;
  @Column()
  cin: number;
  @Column()
  job:string;
  @Column()
  path:string;

}
