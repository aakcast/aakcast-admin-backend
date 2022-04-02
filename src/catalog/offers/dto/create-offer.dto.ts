import {} from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsInt,
  IsArray,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { VariationDto } from './variation.dto';

/**
 * DTO: CreateOffer
 */
export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested()
  variations: VariationDto[];

  @IsOptional()
  @IsUrl()
  imageUrl = '';

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt({ each: true })
  optionGroupIds?: number[];

  @IsOptional()
  @IsBoolean()
  isHidden = false;

  @IsOptional()
  @IsBoolean()
  isPopular = false;
}
