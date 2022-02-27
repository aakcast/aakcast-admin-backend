import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: RequestOtp
 */
export class RequestOtpDto {
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;
}
