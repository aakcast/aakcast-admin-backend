import { ApiProperty } from '@nestjs/swagger';
import { User as UserResponse } from 'proto/user';

/**
 * DTO: User
 */
export class UserDto {
  /**
   * Constructor
   * @param response  UserResponse
   */
  constructor(response: UserResponse) {
    this.type = response.type;
    this.id = response.id;
    this.email = response.email;
    this.isAdmin = response.isAdmin;
    this.joinedAt = new Date(response.createdAt);
  }

  @ApiProperty({
    description: '사용자 타입',
    example: 'staff',
  })
  readonly type: string;

  @ApiProperty({
    description: '사용자 ID',
    example: '1ab09a32-b489-4c31-afe8-685770e4a9cf',
  })
  readonly id: string;

  @ApiProperty({
    description: '로그인 이메일',
    example: 'mankiplayer@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Superuser 여부',
    example: true,
  })
  readonly isAdmin: boolean;

  @ApiProperty({
    description: '가입일시',
    example: new Date('2022-01-01T00:00:00Z'),
  })
  readonly joinedAt: Date;
}
