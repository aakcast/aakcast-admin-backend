import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: EmailVerification
 */
export class EmailVerificationDto {
  /**
   * Constructor
   * @param email   login ID
   * @param exists  existence of ID
   */
  constructor(email: string, exists: boolean) {
    this.email = email;
    this.exists = exists;
  }

  @ApiProperty({
    description: '로그인 ID',
    example: 'mankiplayer@aakcast.io',
  })
  readonly email: string;

  @ApiProperty({
    description: '회원 가입 여부',
    example: true,
  })
  exists: boolean;
}
