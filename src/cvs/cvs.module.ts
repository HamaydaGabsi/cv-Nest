import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Cv])],
  controllers: [CvsController],
  providers: [CvsService]
})
export class CvsModule {}
