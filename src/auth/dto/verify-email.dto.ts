import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO: VerifyEmail
 */
export class VerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email: string;
}
