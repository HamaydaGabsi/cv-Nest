import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { User } from '../../users/entities/user.entity';
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
  @ManyToMany(() => Skill, { cascade: true })
  @JoinTable()
  skills: Skill[];
  @ManyToOne(() => User, (user) => user.cvs)
  user: User
}
