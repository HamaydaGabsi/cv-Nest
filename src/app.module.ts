import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvsModule } from './cvs/cvs.module';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import * as dotenv from 'dotenv'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Cv } from './cvs/entities/cv.entity';
import { Skill } from './skills/entities/skill.entity';
dotenv.config();
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User,Skill,Cv],
    synchronize: true,
  }),
    CvsModule, UsersModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
