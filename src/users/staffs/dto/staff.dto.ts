import { ApiProperty } from '@nestjs/swagger';
import { Staff as StaffResponse } from 'proto/user';

/**
 * DTO: Staff
 */
export class StaffDto {
  /**
   * Constructor
   * @param response  StaffResponse
   */
  constructor(response: StaffResponse) {
    this.id = response.id;
    this.email = response.email;
    this.name = response.name;
    this.mobile = response.mobile;
    this.department = response.department;
    this.isAdmin = response.isAdmin;
    this.joinedAt = new Date(response.createdAt);
    this.active = !response.deletedAt;
  }

  @ApiProperty({
    description: '직원 ID',
    example: '1ab09a32-b489-4c31-afe8-685770e4a9cf',
  })
  readonly id: string;

  @ApiProperty({
    description: '이메일',
    example: 'mankiplayer@aakcast.io',
  })
  readonly email: string;

  @ApiProperty({
    description: '이름',
    example: '홍원기',
  })
  readonly name: string;

  @ApiProperty({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  readonly mobile: string;

  @ApiProperty({
    description: '부서',
    example: '개발팀',
  })
  readonly department: string;

  @ApiProperty({
    description: '관리자 여부',
    example: false,
  })
  readonly isAdmin: boolean;

  @ApiProperty({
    description: '가입일시',
    example: new Date('2022-01-01T00:00:00Z'),
  })
  readonly joinedAt: Date;

  @ApiProperty({
    description: '활성 상태 여부',
    example: true,
  })
  readonly active: boolean;
}
