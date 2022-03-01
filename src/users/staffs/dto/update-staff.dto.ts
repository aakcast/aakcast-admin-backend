import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO: UpdateStaff
 */
export class UpdateStaffDto {
  @ApiPropertyOptional({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password?: string;

  @ApiPropertyOptional({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile?: string;

  @ApiPropertyOptional({
    description: '이름',
    example: '홍원기',
  })
  name?: string;

  @ApiPropertyOptional({
    description: '부서',
    example: '개발팀',
  })
  department?: string;
}
