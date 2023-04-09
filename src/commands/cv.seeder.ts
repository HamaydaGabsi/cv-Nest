import { NestFactory } from '@nestjs/core';
import { CvsModule } from '../cvs/cvs.module';
(async () => {
  const app = await NestFactory.createApplicationContext(CvsModule);
  console.log("hello")
  // const cvsService = app.get(CvsService);

  // const cvs = [
  //   { firstName: 'John1', name: 'Doe', cin: 123456,age:34,job:"lawyer",path:"C:/path" },
  //   { firstName: 'John2', name: 'Doe', cin: 123456,age:34,job:"lawyer",path:"C:/path" },
  // ];

  // cvs.forEach((cv) => cvsService.create(cv));

  await app.close();
})();