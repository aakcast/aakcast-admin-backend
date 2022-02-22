import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../grpc-clients/interfaces/auth.interface';

export const USER_TYPES_KEY = 'types';
export const UserTypes = (...userTypes: UserType[]) => SetMetadata(USER_TYPES_KEY, userTypes);
