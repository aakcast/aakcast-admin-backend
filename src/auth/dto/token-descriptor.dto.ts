import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: TokenDescriptor
 */
export class TokenDescriptorDto {
  /**
   * Constructor
   * @param token   token value
   * @param scheme  token scheme
   * @param format  token format
   */
  constructor(token: string, scheme = 'bearer', format = 'JWT') {
    this.scheme = scheme;
    this.format = format;
    this.token = token;
  }

  @ApiProperty({
    description: '토큰값 (Authorization 헤더에 설정하여 인증한다.)',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  readonly token: string;

  @ApiProperty({
    description: '인증 방식',
    example: 'bearer',
  })
  readonly scheme: string;

  @ApiProperty({
    description: '토큰 형식',
    example: 'JWT',
  })
  readonly format: string;
}
