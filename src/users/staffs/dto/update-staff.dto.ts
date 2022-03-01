import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsMobilePhone, MinLength } from 'class-validator';

/**
 * DTO: UpdateStaff
 */
export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiPropertyOptional({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '이름',
    example: '홍원기',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '부서',
    example: '개발팀',
  })
  department?: string;
}
