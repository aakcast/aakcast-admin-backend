import { ApiProperty } from '@nestjs/swagger';
import { Otp as OtpResponse } from 'proto/auth';

/**
 * Type: OtpDto
 */
export class OtpDto {
  /**
   * Constructor
   *
   * @param response  OtpResponse
   */
  constructor(response: OtpResponse) {
    this.code = response.code;
  }

  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  readonly code: string;
}
