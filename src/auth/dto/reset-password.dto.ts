import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: ResetPassword
 */
export class ResetPasswordDto {
  @ApiProperty({
    description: '재설정할 비밀번호',
    example: 'p@ssw0rd',
  })
  password: string;
}
