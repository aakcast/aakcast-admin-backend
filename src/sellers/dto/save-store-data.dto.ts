import { IsString, IsUrl, IsPhoneNumber, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO: SaveStoreData
 */
export class SaveStoreDataDto {
  @IsString()
  @IsNotEmpty()
  category1: string;

  @IsString()
  @IsNotEmpty()
  category2: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  profileImageUrl: string;

  @IsUrl()
  @IsNotEmpty()
  backgroundImageUrl: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsPhoneNumber('KR')
  @IsOptional()
  tel: string;

  @IsString()
  @IsOptional()
  openHours: string;

  @IsString()
  @IsOptional()
  breaktime: string;

  @IsString()
  @IsOptional()
  holidays: string;

  @IsString()
  @IsOptional()
  extra: string;
}
