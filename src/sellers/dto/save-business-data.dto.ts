import { IsBoolean, IsString, IsUrl, IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

/**
 * DTO: SaveBusinessData
 */
export class SaveBusinessDataDto {
  @IsBoolean()
  @IsNotEmpty()
  isIndividual: boolean;

  @IsString()
  @IsNotEmpty()
  repName: string;

  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  repPhone: string;

  @IsString()
  @IsNotEmpty()
  bizName: string;

  @IsString()
  @IsNotEmpty()
  bizRegNo: string;

  @IsString()
  @IsNotEmpty()
  bizCategory: string;

  @IsString()
  @IsNotEmpty()
  bizAddress: string;

  @IsEmail()
  @IsNotEmpty()
  bizEmail: string;

  @IsUrl()
  @IsNotEmpty()
  bizRegImageUrl: string;

  @IsUrl()
  @IsNotEmpty()
  mailOrderRegImageUrl: string;
}
