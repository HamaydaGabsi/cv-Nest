import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvsService } from '../cvs/cvs.service';
import { UsersService } from '../users/users.service';
import { SkillsService } from '../skills/skills.service';
import {
  randJobTitle,
  randNumber,
  randPassword,
  randSkill,
  randUser,
  seed,
} from '@ngneat/falso';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('hello');
  const cvsService = app.get(CvsService);
  const usersService = app.get(UsersService);
  const skillsService = app.get(SkillsService);
  const skillsData = Array.from({ length: 9 }, () => {
    return { designation: randSkill() };
  });
  await Promise.all(skillsData.map((skill) => skillsService.create(skill)));
  const mySkills = await skillsService.findAll();
  const fullUserData = Array.from({ length: 3 }, (_, i) => {
    seed(i.toString());
    const { email, username, firstName, lastName } = randUser();
    return {
      firstName,
      name: lastName,
      email,
      username,
      password: randPassword(),
      age: randNumber({ min: 20, max: 50 }),
      job: randJobTitle(),
      cin: randNumber({ min: 10000000, max: 19999999 }),
      skills: [mySkills[i], mySkills[i + 1]],
      cvs: [],
    };
  });

  const usersData = fullUserData.map(({ email, username, password, cvs }) => ({
    email,
    username,
    password,
    cvs,
  }));
  await Promise.all(usersData.map((user) => usersService.create(user)));
  const users = await usersService.findAll();
  const cvs = fullUserData.map(
    ({ firstName, name, age, job, cin, skills }, index) => ({
      firstName,
      name,
      age,
      job,
      cin,
      skills,
      path: 'C:/path',
      user: users[index],
    }),
  );

  await Promise.all(cvs.map((cv) => cvsService.create(cv)));

  await app.close();
})();
