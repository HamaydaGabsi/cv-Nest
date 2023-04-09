import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';
import { IsEmail } from 'class-validator';
@Entity('user')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  username:string;
  @Column()
  @IsEmail()
  email:string;
  @Column()
  password:string
}
