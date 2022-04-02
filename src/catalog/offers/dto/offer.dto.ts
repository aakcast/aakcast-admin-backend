import { ApiProperty } from '@nestjs/swagger';
import { Offer as OfferResponse } from 'proto/catalog';

/**
 * DTO: Offer
 */
export class OfferDto {
  /**
   * Constructor
   * @param response  OfferResponse
   */
  constructor(response: OfferResponse) {
    this.id = response.id;
  }

  @ApiProperty({
    description: '',
    example: '',
  })
  readonly id: number;
}
