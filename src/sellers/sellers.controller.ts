import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { SellersService } from './sellers.service';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { CreateSellerDto } from './dto/create-seller.dto';
import { ListSellers } from './dto/list-sellers.dto';
import { UpdateSellerDto } from './dto/update-seller-dto';
import { SaveStoreDataDto } from './dto/save-store-data.dto';
import { SaveContactDataDto } from './dto/save-contact-data.dto';
import { SaveAccountDataDto } from './dto/save-account-data.dto';
import { SaveBusinessDataDto } from './dto/save-business-data.dto';
import { DataStatus } from './enums/data-status.enum';
import { Seller } from './types/seller';
import { StoreData } from './types/store-data';
import { ContactData } from './types/contact-data';
import { AccountData } from './types/account-data';
import { BusinessData } from './types/business-data';

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
   *
   * @param sellersService  Injected instance of SellersService
   */
  constructor(private readonly sellersService: SellersService) {}

  /**
   * GET /v1/sellers/hello/
   */
  @Get('hello')
  hello() {
    this.logger.log(`GET /v1/sellers/hello/`);
    return this.sellersService.hello();
  }

  /**
   * POST /v1/sellers/
   *
   * @param createSellerDto CreateSellerDto
   */
  @Post()
  @ApiOperation({
    summary: '판매자 생성',
    description: '판매자를 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨' })
  async create(@Body() createSellerDto: CreateSellerDto): Promise<void> {
    this.logger.log(`POST /v1/sellers/`);
    this.logger.log(`> body = ${JSON.stringify(createSellerDto)}`);

    await this.sellersService.create(createSellerDto);
  }

  /**
   * GET /v1/sellers/
   *
   * @param query ListSellers
   */
  @Get()
  @ApiOperation({
    summary: '판매자 목록 및 검색',
    description: '판매자 목록을 가져오거나 검색한다.',
  })
  @ApiOkResponse({ description: '' })
  async find(@Query() query: ListSellers): Promise<void> {
    this.logger.log(`GET /v1/sellers/`);
    this.logger.log(`> query = ${JSON.stringify(query)}`);

    // TODO
    // return await this.sellersService.find(query);
  }

  /**
   * GET /v1/sellers/:id/
   *
   * @param id  Seller ID
   */
  @Get(':id')
  @ApiOperation({
    summary: '판매자 정보 상세',
    description: '판매자 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  @ApiNotFoundResponse({ description: '판매자 정보를 찾을 수 없음' })
  findOne(@Param('id') id: string): Promise<Seller> {
    this.logger.log(`GET /v1/sellers/${id}`);

    return this.sellersService.findOne(id);
  }

  /**
   * PATCH /v1
   *
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
   *
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
  @ApiOkResponse({ description: '성공' })
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

    // TODO: This is temporary implementation - files should be uploaded to S3
    // const fs = await require('fs');
    // const path = await require('path');
    // const crypto = await require('crypto');
    // const util = await require('util');
    // const { pipeline } = await require('stream');
    // const getHashFileName = async (part: MultipartFile, algorithm = 'sha256'): Promise<string> => {
    //   const hash = crypto.createHash(algorithm);
    //   hash.update(await part.toBuffer());
    //   const ext = path.extname(part.filename);
    //   return `${hash.digest('hex')}${ext}`;
    // };
    // const dir = `assets/sellers/${id}`;
    // const pump = util.promisify(pipeline);
    // fs.mkdirSync(dir, { recursive: true });
    // for await (const part of req.files()) {
    //   const filename = await getHashFileName(part);
    //   await pump(part.file, fs.createWriteStream(`${dir}/${filename}`));
    // }
    ////////////////////////////////////////////////////////////////////////////

    res.code(200).send();
  }

  /**
   * PUT /v1/sellers/:id/store-data/
   *
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
  async saveStoreData(
    @Param('id') id: string,
    @Body() saveStoreDataDto: SaveStoreDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/store-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveStoreDataDto)}`);

    await this.sellersService.saveStoreData(id, saveStoreDataDto);
    await this.sellersService.update(id, {
      storeDataStatus: DataStatus.Submitted,
    });
  }

  /**
   * GET /v1/sellers/:id/store-data/
   *
   * @param id  Seller ID
   */
  @Get(':id/store-data')
  @ApiOperation({
    summary: '스토어 정보 상세',
    description: '스토어 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  async getStoreData(@Param('id') id: string): Promise<StoreData> {
    this.logger.log(`GET /v1/sellers/${id}/store-data/`);

    return await this.sellersService.getStoreData(id);
  }

  /**
   * PUT /v1/sellers/:id/contact-data/
   *
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
      contactDataStatus: DataStatus.Submitted,
    });
  }

  /**
   * GET /v1/sellers/:id/contact-data/
   *
   * @param id  Seller ID
   */
  @Get(':id/contact-data')
  @ApiOperation({
    summary: '셀러 정보 상세',
    description: '셀러 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  async getContactData(@Param('id') id: string): Promise<ContactData> {
    this.logger.log(`GET /v1/sellers/${id}/contact-data/`);

    return await this.sellersService.getContactData(id);
  }

  @Put(':id/account-data')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '정산 정보 저장',
    description: '정산 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 처리됨' })
  async saveAccountData(
    @Param('id') id: string,
    @Body() saveAccountDataDto: SaveAccountDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/account-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveAccountDataDto)}`);

    await this.sellersService.saveAccountData(id, saveAccountDataDto);
    await this.sellersService.update(id, {
      accountDataStatus: DataStatus.Submitted,
    });
  }

  @Get(':id/account-data')
  @ApiOperation({
    summary: '정산 정보 상세',
    description: '정산 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  async getAccountData(@Param('id') id: string): Promise<AccountData> {
    this.logger.log(`GET /v1/sellers/${id}/account-data/`);

    return await this.sellersService.getAccountData(id);
  }

  @Put(':id/business-data')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '사업자 정보 저장',
    description: '사업자 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 처리됨' })
  async saveBusinessData(
    @Param('id') id: string,
    @Body() saveBusinessDataDto: SaveBusinessDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/business-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveBusinessDataDto)}`);

    await this.sellersService.saveBusinessData(id, saveBusinessDataDto);
    await this.sellersService.update(id, {
      businessDataStatus: DataStatus.Submitted,
    });
  }

  @Get(':id/business-data')
  @ApiOperation({
    summary: '사업자 정보 상세',
    description: '사업자 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  async getBusinessData(@Param('id') id: string): Promise<BusinessData> {
    this.logger.log(`GET /v1/sellers/${id}/business-data/`);

    return await this.sellersService.getBusinessData(id);
  }
}
