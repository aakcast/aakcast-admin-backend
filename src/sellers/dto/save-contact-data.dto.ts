import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: SaveContactDataDto
 */
export class SaveContactDataDto {
  @ApiProperty({
    description: '담당자 이름',
    example: '송준영',
  })
  name: string;

  @ApiProperty({
    description: '담당지 연락처',
    example: '01097582014',
  })
  tel: string;
}
