import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

/**
 * DTO: LoginOtp
 */
export class LoginOtpDto {
  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @IsNumberString()
  @Length(6)
  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  code: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email: string;
}
