// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserType } from '../../auth/dto/user';
// import { Role } from '../enum/role.enum';
// import { ROLES_KEY } from '../decorators/role.decorator';
//
// /**
//  * Guard: UserTypes
//  */
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//
//   canActivate(context: ExecutionContext): boolean {
//     const allowedRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!allowedRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//
//     return allowedRoles.some((role) => {
//       switch (role) {
//         case Role.Admin:
//           return user?.role === UserType.StaffDto && user?.isAdmin;
//         case Role.StaffDto:
//           return user?.role === UserType.StaffDto;
//         case Role.SellerDto:
//           return user?.role === UserType.SellerDto;
//         case Role.Temp:
//           return user?.role === UserType.Temp;
//         default:
//           return false;
//       }
//     });
//   }
// }
