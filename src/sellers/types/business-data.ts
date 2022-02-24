import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SellerBusinessData } from '../../proto/user';

export class BusinessData {
  static fromResponse(response: SellerBusinessData): BusinessData {
    return plainToClass(BusinessData, response);
  }

  /** 구분 (법인/개인) */
  readonly isIndividual: boolean;

  /** 성명(대표자) */
  readonly repName: string;

  /** 대표자 연락처 */
  readonly repPhone: string;

  /** 상호(법인명) */
  readonly bizName: string;

  /** 사업자등록번호 */
  readonly bizRegNo: string;

  /** 업태 */
  readonly bizCategory: string;

  /** 사업장 소재지 */
  readonly bizAddress: string;

  /** 대표 이메일 */
  readonly bizEmail: string;

  /** 사업자등록증 이미지 */
  readonly bizRegImageUrl: string;

  /** 통신판매신고증 이미지 */
  readonly mailOrderRegImageUrl: string;
}
