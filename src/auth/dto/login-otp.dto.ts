import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

/**
 * DTO: LoginOtp
 */
export class LoginOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  code: string;
}
