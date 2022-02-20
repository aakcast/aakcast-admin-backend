import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO: CreateSeller
 */
export class CreateSellerDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '로그인 ID (이메일)',
    example: 'mankiplayer@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password: string;

  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  @ApiProperty({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '이름',
    example: '홍원기',
  })
  name: string;
}
