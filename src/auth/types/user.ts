import { UserType } from '../../proto/auth';
export { UserType };

export class User {
  readonly type: UserType;
  readonly id: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly joinedAt: string;
}
