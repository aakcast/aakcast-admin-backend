import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: CreateSeller
 */
export class CreateSellerDto {
  @ApiProperty({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password: string;

  @ApiProperty({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @ApiProperty({
    description: '이름',
    example: '홍원기',
  })
  name: string;
}
