import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

/**
 * DTO: VerifyEmail
 */
export class VerifyEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email: string;
}
