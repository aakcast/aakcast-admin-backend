import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  UseGuards,
  Req,
  Param,
  Body,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CatalogService } from '../catalog.service';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { IdDto } from '../../core/dto/id.dto';
import { UserDto } from '../../users/dto/user.dto'; // TODO: move to core
import { CreateOfferDto, UpdateOfferDto, OfferDto } from './dto';

/**
 * Controller: Offers
 */
@Controller('offers')
@ApiTags('Offers')
export class OffersController {
  /**
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(OffersController.name);

  /**
   * Constructor
   * @param catalogService  instance of CatalogService
   * @param offersService   instance of OffersService
   */
  constructor(
    private readonly catalogService: CatalogService,
    private readonly offersService: OffersService,
  ) {}

  /**
   * GET /v1/offers/hello/
   */
  @Get('hello')
  @ApiOperation({
    summary: 'Hello',
    description: 'API의 상태를 확인한다.',
  })
  @ApiOkResponse({ description: '정상' })
  @ApiInternalServerErrorResponse({ description: '서비스 접속 불가' })
  hello() {
    this.logger.log(`GET /v1/offers/hello/`);
    return this.catalogService.hello();
  }

  /**
   * POST /v1/offers/
   * @param req             Request object
   * @param createOfferDto  CreateOfferDto
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '상품 생성',
    description: '판매 상품 또는 서비스를 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨', type: IdDto })
  create(@Req() req: any, @Body() createOfferDto: CreateOfferDto): Promise<IdDto> {
    this.logger.log(`POST /v1/offers/`);
    this.logger.log(`> body = ${JSON.stringify(createOfferDto)}`);

    const user = <UserDto>req.user;
    if (user.type !== 'seller') {
      throw new Error(`user is not a seller.`);
    }

    const sellerId = user.id;
    const language = 'ko-KR';

    return this.offersService.create(sellerId, language, createOfferDto);
  }

  // TODO
  // /**
  //  * GET /v1/offers/
  //  */

  /**
   * GET /v1/offers/:id/
   * @param id  Offer ID
   */
  @Get(':id')
  @ApiOperation({
    summary: '상품 상세',
    description: '상품 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: OfferDto })
  @ApiNotFoundResponse({ description: '상품 정보를 찾을 수 없음' })
  findOne(@Param('id') id: number): Promise<OfferDto> {
    this.logger.log(`GET /v1/offers/${id}`);

    const language = 'ko-KR';

    return this.offersService.findOne(id, language);
  }

  /**
   * PATCH /v1/offers/:id/
   * @param id              Offer ID
   * @param updateOfferDto  UpdateOfferDto
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '상품 정보 수정',
    description: '상품 정보를 수정한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 수정됨' })
  async update(@Param('id') id: number, @Body() updateOfferDto: UpdateOfferDto): Promise<void> {
    this.logger.log(`PATCH /v1/offers/${id}`);
    this.logger.log(`> body = ${JSON.stringify(updateOfferDto)}`);

    const language = 'ko-KR';

    await this.offersService.update(id, language, updateOfferDto);
  }

  /**
   * DELETE /v1/offers/:id/
   * @param id  Offer ID
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '상품 삭제',
    description: '상품을 삭제한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 삭제됨' })
  async delete(@Param('id') id: number): Promise<void> {
    this.logger.log(`DELETE /v1/offers/${id}`);

    await this.offersService.delete(id);
  }
}
