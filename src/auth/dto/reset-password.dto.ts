import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsNumberString, Length } from 'class-validator';

/**
 * DTO: ResetPassword
 */
export class ResetPasswordDto {
  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 핸드폰 번호',
    example: '01091910202',
  })
  mobile: string;

  @IsNumberString()
  @Length(6)
  @ApiProperty({
    description: '6자리 일회용 인증코드',
    example: '623094',
  })
  code: string;
}
