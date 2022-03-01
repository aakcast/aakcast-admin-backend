import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO: ResetPassword
 */
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: '재설정할 비밀번호',
    example: 'p@ssw0rd',
  })
  password: string;
}
