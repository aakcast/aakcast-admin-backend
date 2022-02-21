import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enums/user-type.enum';

export const USER_TYPES_KEY = 'types';
export const UserTypes = (...userTypes: UserType[]) => SetMetadata(USER_TYPES_KEY, userTypes);
