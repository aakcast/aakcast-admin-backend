import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: VerifyEmail
 */
export class VerifyEmailDto {
  @ApiProperty({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email: string;
}
