import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../../grpc-clients/interfaces/auth.interface';
import { USER_TYPES_KEY } from '../decorators/user-types.decorator';

/**
 * Guard: UserTypes
 */
@Injectable()
export class UserTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedUserTypes = this.reflector.getAllAndOverride<UserType[]>(USER_TYPES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowedUserTypes) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return allowedUserTypes.some((userType) => user.type === userType);
  }
}
