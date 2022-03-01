import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumberString,
  IsMobilePhone,
  IsUrl,
  IsEmail,
} from 'class-validator';

/**
 * DTO: SaveBusinessData
 */
export class SaveBusinessDataDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: '구분 (법인/개인)',
    example: false,
  })
  isIndividual: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '대표자명',
    example: '송준영',
  })
  repName: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiProperty({
    description: '대표자 연락처',
    example: '01097582014',
  })
  repPhone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '상호(법인명)',
    example: 'aakcast',
  })
  bizName: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @ApiProperty({
    description: '사업자등록번호',
    example: '0000000000',
  })
  bizRegNo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '업태',
    example: '서비스',
  })
  bizCategory: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '사업장 소재지',
    example: '서울시 송파구 삼전동 7-18',
  })
  bizAddress: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    example: 'aakcast@aakcast.io',
  })
  bizEmail?: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: '사업자등록증 이미지 URL',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  bizRegImageUrl1: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiPropertyOptional({
    type: 'string',
    description: '영업신고증 이미지',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  bizRegImageUrl2?: string;
}
