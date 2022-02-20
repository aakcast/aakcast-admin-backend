import { IsString, IsPhoneNumber, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO: SaveContactDataDto
 */
export class SaveContactDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('KR')
  @IsOptional()
  tel: string;
}
