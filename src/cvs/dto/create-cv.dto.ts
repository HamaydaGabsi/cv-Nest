import { IsNotEmpty } from "class-validator";

export class CreateCvDto {
  @IsNotEmpty()
  name:string;
  @IsNotEmpty()
  firstName:string;
  @IsNotEmpty()
  age: number;
  @IsNotEmpty()
  cin: number;
  @IsNotEmpty()
  job:string;
  @IsNotEmpty()
  path:string;
}
