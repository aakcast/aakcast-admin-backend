import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

/**
 * DTO: SaveContactDataDto
 */
export class SaveContactDataDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '담당자 이름',
    example: '송준영',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('KR')
  @ApiProperty({
    description: '담당지 연락처',
    example: '01097582014',
  })
  tel: string;
}
