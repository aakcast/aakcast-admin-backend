import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO: SaveStoreData
 */
export class SaveStoreDataDto {
  @ApiProperty({
    description: '대분류',
    example: '음식점',
  })
  category1: string;

  @ApiProperty({
    description: '소분류',
    example: '한식',
  })
  category2: string;

  @ApiProperty({
    description: '스토어 이름',
    example: '전주현대옥 가락점',
  })
  name: string;

  @ApiProperty({
    description: '프로필 이미지',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  profileImageUrl: string;

  @ApiProperty({
    description: '배경 이미지',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  backgroundImageUrl: string;

  @ApiProperty({
    description: '스토어 소개',
    example: '안녕하세 전주 현대옥 가락점입니',
  })
  description: string;

  @ApiProperty({
    description: '지역 카테고리',
    example: '잠',
  })
  region: string;

  @ApiProperty({
    description: '주소',
    example: '서울 송파구 삼전동 7-18',
  })
  address1: string;

  @ApiPropertyOptional({
    description: '상세주소',
    example: '301호',
  })
  address2?: string;

  @ApiPropertyOptional({
    description: '매장 전화번호',
    example: '00012345678',
  })
  tel?: string;

  @ApiPropertyOptional({
    description: '운영시간',
    example: '평일 오후 3:00~오전 1:00\n주말 오후 12:00~오전 2:00',
  })
  openHours?: string;

  @ApiPropertyOptional({
    description: '준비시간 (브레이크 타임)',
    example: '오후 4:00~오후 5:00',
  })
  breaktime?: string;

  @ApiPropertyOptional({
    description: '휴무일',
    example: '연중무휴',
  })
  holidays?: string;

  extra: string;
}
