import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Otp as OtpResponse } from '../../proto/auth';

/**
 * Type: Otp
 */
export class Otp {
  static fromResponse(response: OtpResponse): Otp {
    return plainToClass(Otp, response);
  }

  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  readonly code: string;
}
