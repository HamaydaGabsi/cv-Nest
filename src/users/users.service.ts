import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto){
    
    return await this.usersRepository.save(createUserDto)
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException(`le user d'id ${id} n'existe pas`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    return await this.usersRepository.save(user);
    // const affUsers = await this.usersRepository.update({'id':id},updateUserDto)
    // if (affUsers.affected==0){
    //   throw new NotFoundException(`le user d'id ${id} n'existe pas`)
    // }
    // return
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if(id==user.id){
      return await this.usersRepository.softRemove(user)
    }
    else {
      throw new NotFoundException(`le user d'id ${id} n'existe pas`)
    }
  }
}
