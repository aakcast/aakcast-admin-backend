import { Observable } from 'rxjs';

/**
 * Interface: AuthService
 */
export interface IAuthService {
  hello(data: Empty): Observable<ServiceDescriptor>;

  createAccount(data: CreateAccountRequest): Observable<Id>;
  updateAccount(data: UpdateAccountRequest): Observable<void>;
  validateAccount(data: ValidateAccountRequest): Observable<User>;

  createTemporaryCredentials(data: CreateTemporaryCredentialsRequest): Observable<Otp>;
  validateTemporaryCredentials(
    data: ValidateTemporaryCredentialsRequest,
  ): Observable<User>;
}

/**
 * Empty object
 */
export type Empty = Record<string, never>;

/**
 * Common parameter with ID field
 */
export interface Id {
  id: string;
}

/**
 * Enum: type of users
 */
export enum UserType {
  Admin = 'admin',
  Staff = 'staff',
  Seller = 'seller',
  TempAuthorizedLv1 = 'temp1', // temporary authenticated user who can only view one's profile
  TempAuthorizedLv2 = 'temp2', // temporary authenticated user who can only reset one's password
}

/**
 * Response type of Hello request
 */
export interface ServiceDescriptor {
  service: string;
  version: string;
}

/**
 * Response type of Login and LoginTemporaryCredentials
 */
export interface User {
  id: string;
  type: UserType;
  email: string;
  joinedAt: Date;
}

/**
 * Response type of CreateTemporaryCredentials
 */
export interface Otp {
  code: number;
}

/**
 * Parameter type for CreateAccount request
 */
export interface CreateAccountRequest {
  email: string;
  password: string;
}

/**
 * Parameter type for UpdateAccount request
 */
export interface UpdateAccountRequest extends Id {
  password?: string;
  staffId?: string | null;
  sellerId?: string | null;
}

/**
 * Parameter type for ValidateAccount request
 */
export interface ValidateAccountRequest {
  email: string;
  password: string;
}

/**
 * Parameter type for CreateTemporaryCredentials request
 */
export interface CreateTemporaryCredentialsRequest {
  mobile: string;
  digits: number;
  expires?: Date;
}

/**
 * Parameter type for ValidateTemporaryCredentials request
 */
export interface ValidateTemporaryCredentialsRequest {
  mobile: string;
  code: string;
  email?: string;
}
