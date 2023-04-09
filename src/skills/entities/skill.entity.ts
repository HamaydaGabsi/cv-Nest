import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';

@Entity('skill')
export class Skill extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  designation:string;
}
