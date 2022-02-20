import { IsString, IsNumberString, IsUrl, IsNotEmpty } from 'class-validator';

/**
 * DTO: SaveAccountData
 */
export class SaveAccountDataDto {
  @IsString()
  @IsNotEmpty()
  bank: string;

  @IsString()
  @IsNotEmpty()
  accountHolder: string;

  @IsNumberString()
  @IsNotEmpty()
  accountNumber: string;

  @IsUrl()
  @IsNotEmpty()
  accountImageUrl: string;
}
