import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create-staff.dto';

/**
 * DTO: UpdateStaff
 */
export class UpdateStaffDto extends PartialType(OmitType(CreateStaffDto, ['email'])) {}
