import {
  IsString,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @MinLength(6)
  password: string;
}
