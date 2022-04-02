import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: Uuid
 */
export class UuidDto {
  /**
   * Constructor
   * @param response  protobuf response
   */
  constructor(response: { id: string }) {
    this.id = response.id;
  }

  @ApiProperty({
    description: '생성된 개체 ID',
    example: '1ab09a32-b489-4c31-afe8-685770e4a9cf',
  })
  readonly id: string;
}
