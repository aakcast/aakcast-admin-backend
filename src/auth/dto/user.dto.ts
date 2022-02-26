import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { User as UserResponse, User_Type } from 'proto/auth';
import { UserType } from '../enums/user-type.enum';

/**
 * DTO: User
 */
export class UserDto {
  /**
   * Constructor
   *
   * @param response  UserResponse
   */
  constructor(response: UserResponse) {
    this.type = UserDto.convertUserType(response.type);
    this.id = response.id;
    this.email = response.email;
    this.isAdmin = response.isAdmin;
    this.joinedAt = new Date(response.createdAt);
  }

  @ApiProperty({
    description: '사용자 타입',
    example: UserType.Staff,
  })
  readonly type: UserType;

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

  /**
   * User_Type -> UserType
   *
   * @param type  User_Type enum
   * @private
   */
  private static convertUserType(type: User_Type): UserType {
    switch (type) {
      case User_Type.STAFF:
        return UserType.Staff;
      case User_Type.SELLER:
        return UserType.Seller;
      case User_Type.TEMP:
        return UserType.Temp;
      default:
        throw new InternalServerErrorException();
    }
  }
}
