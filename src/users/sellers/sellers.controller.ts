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
    description: 'API??? ????????? ????????????.',
  })
  @ApiOkResponse({ description: '??????' })
  @ApiInternalServerErrorResponse({ description: '????????? ?????? ??????' })
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
    summary: '????????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiCreatedResponse({ description: '?????? ?????????', type: UuidDto })
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
    summary: '????????? ?????? ??? ??????',
    description: '????????? ????????? ??????????????? ????????????.',
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
    summary: '????????? ?????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiOkResponse({ description: '??????', type: SellerDetailDto })
  @ApiNotFoundResponse({ description: '????????? ????????? ?????? ??? ??????' })
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
    summary: '????????? ?????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '??????????????? ?????????' })
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
    summary: '?????? ?????????',
    description: '???????????? ????????? ??????(?????????)??? ???????????????.',
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
    description: '??????',
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
    summary: '????????? ?????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '?????? ?????????' })
  @ApiForbiddenResponse({ description: '?????? ????????? ????????? ?????? ?????? ??????' })
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
    summary: '?????? ?????? ??????',
    description: '?????? ????????? ????????????.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '?????? ?????????' })
  @ApiForbiddenResponse({ description: '?????? ????????? ????????? ?????? ?????? ??????' })
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
    summary: '?????? ?????? ??????',
    description: '?????? ????????? ????????????.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '?????? ?????????' })
  @ApiForbiddenResponse({ description: '?????? ????????? ????????? ?????? ?????? ??????' })
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
    summary: '????????? ?????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '?????? ?????????' })
  @ApiForbiddenResponse({ description: '?????? ????????? ????????? ?????? ?????? ??????' })
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
    summary: '????????? ?????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiOkResponse({ description: '??????', type: StoreDataDto })
  @ApiNotFoundResponse({ description: '????????? ????????? ???????????? ??????' })
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
    summary: '?????? ?????? ??????',
    description: '?????? ????????? ????????????.',
  })
  @ApiOkResponse({ description: '??????', type: ContactDataDto })
  @ApiNotFoundResponse({ description: '?????? ????????? ???????????? ??????' })
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
    summary: '?????? ?????? ??????',
    description: '?????? ????????? ????????????.',
  })
  @ApiOkResponse({ description: '??????', type: AccountDataDto })
  @ApiNotFoundResponse({ description: '?????? ????????? ???????????? ??????' })
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
    summary: '????????? ?????? ??????',
    description: '????????? ????????? ????????????.',
  })
  @ApiOkResponse({ description: '??????', type: BusinessDataDto })
  @ApiNotFoundResponse({ description: '????????? ????????? ???????????? ??????' })
  getBusinessData(@Param('id') id: string): Promise<BusinessDataDto> {
    this.logger.log(`GET /v1/sellers/${id}/business-data/`);

    return this.sellersService.getBusinessData(id);
  }
}
