import {
  IsMobilePhone,
  IsNumberString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class FindByMobile {
  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  mobile: string;

  @IsNumberString()
  @Length(6)
  code: string;
}
