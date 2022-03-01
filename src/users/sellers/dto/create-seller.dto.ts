import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsMobilePhone, MinLength } from 'class-validator';

/**
 * DTO: CreateSeller
 */
export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
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
}
