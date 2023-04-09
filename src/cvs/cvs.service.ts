import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv) private cvsRepository: Repository<Cv>
  ){}

  async create(createCvDto: CreateCvDto) {
    console.log("inside create")
    return await this.cvsRepository.save(createCvDto);
  }

  async findAll() {
    return await this.cvsRepository.find();
  }

  async findOne(id: number) {
    const cv = await this.cvsRepository.findOneBy({ id });
    if(!cv){
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    const cv = await this.cvsRepository.preload({
      id: +id,
      ...updateCvDto,
    });
    if (!cv) {
      throw new NotFoundException(`cv with id ${id} not found`);
    }
    return await this.cvsRepository.save(cv);
  }

  async remove(id: number) {
    const cv = await this.findOne(id);
    if (id === cv.id) {
      return await this.cvsRepository.softRemove(cv);
    } else {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
  }
}
