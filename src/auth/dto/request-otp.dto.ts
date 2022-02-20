import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

/**
 * DTO: RequestOtp
 */
export class RequestOtpDto {
  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;
}
