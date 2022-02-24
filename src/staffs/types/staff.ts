import { plainToClass } from 'class-transformer';
import { Staff as StaffResponse } from '../../proto/user';

/**
 * Type: Staff
 */
export class Staff {
  static fromResponse(response: StaffResponse): Staff {
    return plainToClass(Staff, {
      ...response,
      joinedAt: new Date(response.joinedAt),
      deletedAt: response.deletedAt && new Date(response.deletedAt),
    });
  }

  readonly id: string;

  readonly name: string;

  readonly mobile: string;

  readonly department: string;

  readonly isAdmin: boolean;

  readonly joinedAt: Date;

  readonly deletedAt: Date | null;
}
