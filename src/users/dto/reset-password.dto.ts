import { IsString, IsNumberString, Length, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsNumberString()
  @Length(6)
  code: string;
}
