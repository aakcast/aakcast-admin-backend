import { Observable } from 'rxjs';

/**
 * Interface: UserService
 */
export interface IUserService {
  hello(data: Empty): Observable<ServiceDescriptor>;

  createStaff(data: CreateStaffRequest): Observable<Id>;
  // listStaffs(data: ListStaffsRequest): Observable<PaginatedResult<Staff>>;
  getStaff(data: Id): Observable<Staff>;
  updateStaff(data: UpdateStaffRequest): Observable<Empty>;
  deleteStaff(data: Id): Observable<void>;

  createSeller(data: CreateSellerRequest): Observable<Id>;
  // listSellers(data: ListSellersRequest): Observable<PaginatedResult<Seller>>;
  getSeller(data: Id): Observable<Seller>;
  updateSeller(data: UpdateSellerRequest): Observable<void>;
  saveSellerStoreData(data: SaveSellerStoreDataRequest): Observable<void>;
  saveSellerContactData(data: SaveSellerContactDataRequest): Observable<void>;
  saveSellerAccountData(data: SaveSellerAccountDataRequest): Observable<void>;
  saveSellerBusinessData(data: SaveSellerBusinessDataRequest): Observable<void>;
  getSellerStoreData(data: Id): Observable<SellerStoreData>;
  getSellerContactData(data: Id): Observable<SellerContactData>;
  getSellerAccountData(data: Id): Observable<SellerAccountData>;
  getSellerBusinessData(data: Id): Observable<SellerBusinessData>;
}

/**
 * Empty object
 */
export type Empty = Record<string, never>;

/**
 * Seller data submission status
 */
export enum SellerDataStatus {
  None = '',
  Submitted = 'submitted',
  Approved = 'approved',
  Rejected = 'rejected',
}

/**
 * Common parameter with ID field
 */
export interface Id {
  id: string;
}

/**
 * Response type of Hello request
 */
export interface ServiceDescriptor {
  service: string;
  version: string;
}

/**
 * Response type of GetStaff request
 */
export interface Staff extends Id {
  name: string;
  mobile: string;
  department: string;
  isAdmin: boolean;
  joinedAt: Date;
  deletedAt: Date | null;
}

/**
 * Response type of GetSeller request
 */
export interface Seller extends Id {
  name: string;
  mobile: string;
  joinedAt: Date;
  deletedAt: Date | null;
  storeDataStatus: SellerDataStatus;
  storeDataComment: string;
  contactDataStatus: SellerDataStatus;
  contactDataComment: string;
  accountDataStatus: SellerDataStatus;
  accountDataComment: string;
  businessDataStatus: SellerDataStatus;
  businessDataComment: string;
}

// export interface PaginatedResult<Entity> {
//   count: number;
//   items: Entity[];
// }

/**
 * Response type of GetSellerStoreData request
 */
export interface SellerStoreData {
  category1: string;
  category2: string;
  name: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  description: string;
  region: string;
  address1: string;
  address2: string;
  tel: string;
  openHours: string;
  breaktime: string;
  holidays: string;
  extra: string;
}

/**
 * Response type of GetSellerContactData request
 */
export interface SellerContactData {
  name: string;
  tel: string;
}

/**
 * Response type of GetSellerAccountData request
 */
export interface SellerAccountData {
  bank: string;
  accountHolder: string;
  accountNumber: string;
  accountImageUrl: string;
}

/**
 * Response type of GetSellerBusinessData request
 */
export interface SellerBusinessData {
  isIndividual: boolean;
  repName: string;
  repPhone: string;
  bizName: string;
  bizRegNo: string;
  bizCategory: string;
  bizAddress: string;
  bizEmail: string;
  bizRegImageUrl: string;
  mailOrderRegImageUrl: string;
}

/**
 * Parameter type for CreateStaff request
 */
export interface CreateStaffRequest {
  name: string;
  mobile: string;
  department: string;
}

// /**
//  * Parameter type of ListStaffs request
//  */
// export interface ListStaffsRequest {
//   from?: number;
//   size?: number;
//   sort?: Record<keyof Staff, 'asc'>;
//   query?: string;
// }

/**
 * Parameter type for UpdateStaff request
 */
export type UpdateStaffRequest = Id & Partial<CreateStaffRequest>;

/**
 * Parameter type for CreateSeller request
 */
export interface CreateSellerRequest {
  name: string;
  mobile: string;
}

/**
 * Parameter type for UpdateSeller request
 */
export type UpdateSellerRequest = Id & {
  storeDataStatus?: SellerDataStatus;
  storeDataComment?: string;
  contactDataStatus?: SellerDataStatus;
  contactDataComment?: string;
  accountDataStatus?: SellerDataStatus;
  accountDataComment?: string;
  businessDataStatus?: SellerDataStatus;
  businessDataComment?: string;
};

// /**
//  * Parameter type of ListSellers request
//  */
// export interface ListSellersRequest {
//   from?: number;
//   size?: number;
//   sort?: Record<keyof Seller, 'asc'>;
//   query?: string;
// }

/**
 * Parameter type for SaveSellerStoreData request
 */
export interface SaveSellerStoreDataRequest extends Id {
  category1: string;
  category2: string;
  name: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  description: string;
  region: string;
  address1: string;
  address2?: string;
  tel?: string;
  openHours?: string;
  breaktime?: string;
  holidays?: string;
  extra?: string;
}

/**
 * Parameter type for SaveSellerContactData request
 */
export interface SaveSellerContactDataRequest extends Id {
  name: string;
  tel: string;
}

/**
 * Parameter type for SaveSellerAccountData request
 */
export interface SaveSellerAccountDataRequest extends Id {
  bank: string;
  accountHolder: string;
  accountNumber: string;
  accountImageUrl: string;
}

/**
 * Parameter type for SaveSellerBusinessData request
 */
export interface SaveSellerBusinessDataRequest extends Id {
  isIndividual: boolean;
  repName: string;
  repPhone: string;
  bizName: string;
  bizRegNo: string;
  bizCategory: string;
  bizAddress: string;
  bizEmail: string;
  bizRegImageUrl: string;
  mailOrderRegImageUrl: string;
}
