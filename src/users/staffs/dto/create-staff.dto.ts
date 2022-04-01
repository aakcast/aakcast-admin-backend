import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsEmail,
  IsMobilePhone,
  MinLength,
} from 'class-validator';

/**
 * DTO: CreateStaff
 */
export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: '로그인 ID',
    example: 'mankiplayer@aakcast.io',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiProperty({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '이름',
    example: '홍원기',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '부서',
    example: '개발팀',
  })
  department?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: '상태 (true: 정상, false: 중지)',
    example: true,
    default: true,
  })
  isActive = true;
}
