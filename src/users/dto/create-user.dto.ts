import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Cv } from "../../cvs/entities/cv.entity";
import { Skill } from "../../skills/entities/skill.entity";

export class CreateUserDto {
  @IsNotEmpty()
  username:string;
  @IsNotEmpty()
  @IsEmail()
  email:string;
  @IsNotEmpty()
  password:string
  cvs: Cv[]
}
