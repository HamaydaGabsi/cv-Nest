import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto){
    console.log('inside create')
    return await this.skillsRepository.save(createSkillDto);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillsRepository.find();
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillsRepository.findOneBy({id});
    if (!skill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.skillsRepository.preload({
      id: +id,
      ...updateSkillDto,
    });
    if (!skill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }
    return await this.skillsRepository.save(skill);
  }

  async remove(id: number): Promise<Skill> {
    const skill = await this.findOne(id);
    if (id === skill.id) {
      return await this.skillsRepository.softRemove(skill);
    } else {
      throw new NotFoundException(`le skill d'id ${id} n'existe pas`);
    }
  }
}
