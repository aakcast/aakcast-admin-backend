import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { User as UserResponse, User_Type } from '../../proto/auth';
import { UserType } from '../enums/user-type.enum';

/**
 * Type: User
 */
export class User {
  static fromResponse(response: UserResponse): User {
    return plainToClass(User, {
      ...response,
      type: User.convertUserType(response.type),
      joinedAt: new Date(response.joinedAt),
    });
  }

  @ApiProperty({
    description: '사용자 타입',
    example: UserType.Staff,
  })
  readonly type: UserType;

  @ApiProperty({
    description: '사용자 ID',
    example: '',
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
    description: '가입일',
    example: '',
  })
  readonly joinedAt: Date;

  /**
   * UserType -> User_Type
   *
   * @param type  UserType
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
