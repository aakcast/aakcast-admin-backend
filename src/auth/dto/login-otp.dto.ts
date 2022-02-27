import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO: LoginOtp
 */
export class LoginOtpDto {
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  code: string;

  @ApiPropertyOptional({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email?: string;
}
