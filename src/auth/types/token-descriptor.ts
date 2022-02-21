import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity: TokenDescriptor
 */
export class TokenDescriptor {
  @ApiProperty({
    description: '인증 방식',
    example: 'bearer',
  })
  scheme: string;

  @ApiProperty({
    description: '토큰 형식',
    example: 'JWT',
  })
  format: string;

  @ApiProperty({
    description: '토큰값 (Authorization 헤더에 설정하여 인증한다.)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token: string;
}
