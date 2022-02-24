import { ApiProperty } from '@nestjs/swagger';

/**
 * Type: Otp
 */
export class Otp {
  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  readonly code: string;
}
