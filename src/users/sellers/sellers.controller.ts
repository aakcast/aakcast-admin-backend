import {
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  Req,
  Res,
  Param,
  Query,
  Body,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import path from 'path';
import crypto from 'crypto';
import { FastifyReply } from 'fastify';
import { MultipartFile } from 'fastify-multipart';
import { Bucket, ObjectInfo } from 'proto/storage';
import { ApiPaginatedResponse } from '../../core/decorators/api-response.decorator';
import { UsersService } from '../users.service';
import { SellersService } from './sellers.service';
import { ObjectsService } from '../../storage/objects/objects.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { UuidDto } from '../../core/dto/uuid.dto';
import { FindDto } from '../../core/dto/find.dto';
import { PaginatedDto } from '../../core/dto/paginated.dto';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller-dto';
import { SaveStoreDataDto } from './dto/save-store-data.dto';
import { SaveContactDataDto } from './dto/save-contact-data.dto';
import { SaveAccountDataDto } from './dto/save-account-data.dto';
import { SaveBusinessDataDto } from './dto/save-business-data.dto';
import { SellerDto } from './dto/seller.dto';
import { SellerDetailDto } from './dto/seller-detail.dto';
import { StoreDataDto } from './dto/store-data.dto';
import { ContactDataDto } from './dto/contact-data.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { BusinessDataDto } from './dto/business-data.dto';

/**
 * Controller: Sellers
 */
@Controller('sellers')
@ApiTags('Sellers')
export class SellersController {
  /**
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(SellersController.name);

  /**
   * Constructor
   * @param usersService    Injected instance of UsersService
   * @param sellersService  Injected instance of SellersService
   * @param objectsService  Injected instance of ObjectsService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly sellersService: SellersService,
    private readonly objectsService: ObjectsService,
  ) {}

  /**
   * GET /v1/sellers/hello/
   */
  @Get('hello')
  @ApiOperation({
    summary: 'Hello',
    description: 'API의 상태를 확인한다.',
  })
  @ApiOkResponse({ description: '정상' })
  @ApiInternalServerErrorResponse({ description: '서비스 접속 불가' })
  hello() {
    this.logger.log(`GET /v1/sellers/hello/`);
    return this.usersService.hello();
  }

  /**
   * POST /v1/sellers/
   * @param createSellerDto CreateSellerDto
   */
  @Post()
  @ApiOperation({
    summary: '판매자 생성',
    description: '판매자 계정을 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨', type: UuidDto })
  create(@Body() createSellerDto: CreateSellerDto): Promise<UuidDto> {
    this.logger.log(`POST /v1/sellers/`);
    this.logger.log(`> body = ${JSON.stringify(createSellerDto)}`);

    return this.sellersService.create(createSellerDto);
  }

  /**
   * GET /v1/sellers/
   * @param findDto FindDto
   */
  @Get()
  @ApiOperation({
    summary: '판매자 목록 및 검색',
    description: '판매자 목록을 가져오거나 검색한다.',
  })
  @ApiExtraModels(PaginatedDto, SellerDto)
  @ApiPaginatedResponse(SellerDto)
  find(@Query() findDto: FindDto): Promise<PaginatedDto<SellerDto>> {
    this.logger.log(`GET /v1/sellers/`);
    this.logger.log(`> query = ${JSON.stringify(findDto)}`);

    return this.sellersService.find(findDto);
  }

  /**
   * GET /v1/sellers/:id/
   * @param id  Seller ID
   */
  @Get(':id')
  @ApiOperation({
    summary: '판매자 정보 상세',
    description: '판매자 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: SellerDetailDto })
  @ApiNotFoundResponse({ description: '판매자 정보를 찾을 수 없음' })
  findOne(@Param('id') id: string): Promise<SellerDetailDto> {
    this.logger.log(`GET /v1/sellers/${id}`);

    return this.sellersService.findOne(id);
  }

  /**
   * PATCH /v1/sellers/:id/
   * @param req             Request object
   * @param id              Seller ID
   * @param updateSellerDto UpdateSellerDto
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '판매자 정보 수정',
    description: '판매자 정보를 수정한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상적으로 변경됨' })
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ): Promise<void> {
    this.logger.log(`PATCH /v1/sellers/${id}`);
    this.logger.log(`> body = ${JSON.stringify(updateSellerDto)}`);

    await this.sellersService.update(id, updateSellerDto);
  }

  /**
   * POST /v1/sellers/:id/upload/
   * @param id  Seller ID
   * @param req Request object
   * @param res Reply object
   */
  @Post(':id/upload')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '파일 업로드',
    description: '판매자와 관련된 파일(이미지)를 업로드한다.',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          length: { type: 'number' },
          mimetype: { type: 'string' },
        },
      },
    },
  })
  async uploadFiles(
    @Param('id') id: string,
    @Req() req: any,
    @Res() res: FastifyReply,
  ): Promise<void> {
    this.logger.log(`POST /v1/sellers/${'id'}/upload/`);
    this.logger.log(`> req.isMultipart? ${req.isMultipart()}`);

    if (!req.isMultipart()) {
      throw new BadRequestException();
    }

    const getHashFileName = async (part: MultipartFile, algorithm = 'sha256'): Promise<string> => {
      const hash = crypto.createHash(algorithm);
      hash.update(await part.toBuffer());
      const ext = path.extname(part.filename);
      return `${hash.digest('hex')}${ext}`;
    };
    const results: ObjectInfo[] = [];

    // Upload files
    for await (const part of req.files()) {
      const info = await this.objectsService.put({
        target: {
          bucket: Bucket.IMAGE,
          key: `sellers/${req.user.id}/${await getHashFileName(part)}`,
        },
        mimetype: part.mimetype,
        data: await part.toBuffer(),
      });
      results.push(info);
    }

    res.code(200).send(results);
  }

  /**
   * PUT /v1/sellers/:id/store-data/
   * @param id                Seller ID
   * @param saveStoreDataDto  SaveStoreDataDto
   */
  @Put(':id/store-data')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스토어 정보 저장',
    description: '스토어 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 처리됨' })
  @ApiForbiddenResponse({ description: '다른 판매자 정보에 대한 수정 요청' })
  async saveStoreData(
    @Param('id') id: string,
    @Body() saveStoreDataDto: SaveStoreDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/store-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveStoreDataDto)}`);

    await this.sellersService.saveStoreData(id, saveStoreDataDto);
    await this.sellersService.update(id, {
      storeDataStatus: 'submitted',
    });
  }

  /**
   * PUT /v1/sellers/:id/contact-data/
   * @param req                 Request object
   * @param id                  Seller ID
   * @param saveContactDataDto  SaveContactDataDto
   */
  @Put(':id/contact-data')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '셀러 정보 저장',
    description: '셀러 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 처리됨' })
  @ApiForbiddenResponse({ description: '다른 판매자 정보에 대한 수정 요청' })
  async saveContactData(
    @Req() req: any,
    @Param('id') id: string,
    @Body() saveContactDataDto: SaveContactDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/contact-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveContactDataDto)}`);

    await this.sellersService.saveContactData(id, saveContactDataDto);
    await this.sellersService.update(id, {
      contactDataStatus: 'submitted',
    });
  }

  /**
   * PUT /v1/sellers/:id/account-data/
   * @param id                  Seller ID
   * @param saveAccountDataDto  SaveAccountDataDto
   */
  @Put(':id/account-data')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '정산 정보 저장',
    description: '정산 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 처리됨' })
  @ApiForbiddenResponse({ description: '다른 판매자 정보에 대한 수정 요청' })
  async saveAccountData(
    @Param('id') id: string,
    @Body() saveAccountDataDto: SaveAccountDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/account-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveAccountDataDto)}`);

    await this.sellersService.saveAccountData(id, saveAccountDataDto);
    await this.sellersService.update(id, {
      accountDataStatus: 'submitted',
    });
  }

  /**
   * PUT /v1/sellers/:id/business-data/
   * @param id                  Seller ID
   * @param saveBusinessDataDto SaveBusinessDataDto
   */
  @Put(':id/business-data')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '사업자 정보 저장',
    description: '사업자 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 처리됨' })
  @ApiForbiddenResponse({ description: '다른 판매자 정보에 대한 수정 요청' })
  async saveBusinessData(
    @Param('id') id: string,
    @Body() saveBusinessDataDto: SaveBusinessDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/business-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveBusinessDataDto)}`);

    await this.sellersService.saveBusinessData(id, saveBusinessDataDto);
    await this.sellersService.update(id, {
      businessDataStatus: 'submitted',
    });
  }

  /**
   * GET /v1/sellers/:id/store-data/
   * @param id  Seller ID
   */
  @Get(':id/store-data')
  @ApiOperation({
    summary: '스토어 정보 상세',
    description: '스토어 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: StoreDataDto })
  @ApiNotFoundResponse({ description: '스토어 정보가 존재하지 않음' })
  getStoreData(@Param('id') id: string): Promise<StoreDataDto> {
    this.logger.log(`GET /v1/sellers/${id}/store-data/`);

    return this.sellersService.getStoreData(id);
  }

  /**
   * GET /v1/sellers/:id/contact-data/
   * @param id  Seller ID
   */
  @Get(':id/contact-data')
  @ApiOperation({
    summary: '셀러 정보 상세',
    description: '셀러 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: ContactDataDto })
  @ApiNotFoundResponse({ description: '셀러 정보가 존재하지 않음' })
  getContactData(@Param('id') id: string): Promise<ContactDataDto> {
    this.logger.log(`GET /v1/sellers/${id}/contact-data/`);

    return this.sellersService.getContactData(id);
  }

  /**
   * GET /v1/sellers/:id/account-data/
   * @param id  Seller ID
   */
  @Get(':id/account-data')
  @ApiOperation({
    summary: '정산 정보 상세',
    description: '정산 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: AccountDataDto })
  @ApiNotFoundResponse({ description: '정산 정보가 존재하지 않음' })
  getAccountData(@Param('id') id: string): Promise<AccountDataDto> {
    this.logger.log(`GET /v1/sellers/${id}/account-data/`);

    return this.sellersService.getAccountData(id);
  }

  /**
   * GET /v1/sellers/:id/business-data/
   * @param id  Seller ID
   */
  @Get(':id/business-data')
  @ApiOperation({
    summary: '사업자 정보 상세',
    description: '사업자 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: BusinessDataDto })
  @ApiNotFoundResponse({ description: '사업자 정보가 존재하지 않음' })
  getBusinessData(@Param('id') id: string): Promise<BusinessDataDto> {
    this.logger.log(`GET /v1/sellers/${id}/business-data/`);

    return this.sellersService.getBusinessData(id);
  }
}
