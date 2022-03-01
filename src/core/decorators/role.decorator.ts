import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLES_KEY = 'roles';

/**
 * Decorator: Roles
 * @param roles Array of Role enum
 * @constructor
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
