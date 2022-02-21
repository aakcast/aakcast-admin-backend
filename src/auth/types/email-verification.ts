import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity: EmailVerification
 */
export class EmailVerification {
  @ApiProperty({
    description: '로그인 이메일',
    example: 'mankiplayer@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '회원 가입 여부',
    example: true,
  })
  exists: boolean;
}
