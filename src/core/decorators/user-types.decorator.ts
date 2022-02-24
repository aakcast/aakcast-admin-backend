import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../proto/auth';

export const USER_TYPES_KEY = 'types';
export const UserTypes = (...userTypes: UserType[]) => SetMetadata(USER_TYPES_KEY, userTypes);
