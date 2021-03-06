import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: Id
 */
export class IdDto {
  /**
   * Constructor
   * @param response  protobuf response
   */
  constructor(response: { id: number }) {
    this.id = response.id;
  }

  @ApiProperty({
    description: '생성된 개체 ID',
    example: 100021,
  })
  readonly id: number;
}
