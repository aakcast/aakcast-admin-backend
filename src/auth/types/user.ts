import { UserType } from '../../proto/auth';
export { UserType } from '../../proto/auth';

export class User {
  readonly type: UserType;
  readonly id: string;
  readonly email: string;
  readonly joinedAt: string;
}
