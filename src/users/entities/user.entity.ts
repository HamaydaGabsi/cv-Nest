import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';
import { IsEmail } from 'class-validator';
import { Cv } from '../../cvs/entities/cv.entity';
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
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[]
}
