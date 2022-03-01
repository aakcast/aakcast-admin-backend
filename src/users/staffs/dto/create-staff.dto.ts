import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO: CreateStaff
 */
export class CreateStaffDto {
  @ApiProperty({
    description: '로그인 ID',
    example: 'mankiplayer@aakcast.io',
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

  @ApiPropertyOptional({
    description: '부서',
    example: '개발팀',
  })
  department?: string;
}
