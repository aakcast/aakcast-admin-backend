import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

/**
 * DTO: RequestOtp
 */
export class RequestOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;
}
