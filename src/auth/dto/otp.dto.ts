import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Otp as OtpResponse } from '../../proto/auth';

/**
 * Type: OtpDto
 */
export class OtpDto {
  static fromResponse(response: OtpResponse): OtpDto {
    return plainToClass(OtpDto, response);
  }

  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  readonly code: string;
}
