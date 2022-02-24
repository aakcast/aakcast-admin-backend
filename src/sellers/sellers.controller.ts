import {
  BadRequestException,
  Body,
  Controller, ForbiddenException,
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
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../grpc-clients/services/user.service';
import { AuthService } from '../grpc-clients/services/auth.service';
import { UserType } from '../grpc-clients/interfaces/auth.interface';
import { UserTypes } from '../core/decorators/role.decorator';
import {
  Seller,
  SellerAccountData,
  SellerBusinessData,
  SellerContactData,
  SellerDataStatus,
  SellerStoreData,
} from '../grpc-clients/interfaces/user.interface';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { CreateSellerDto } from './dto/create-seller.dto';
import { ListSellers } from './dto/list-sellers.dto';
import { UpdateSellerDto } from './dto/update-seller-dto';
import { SaveStoreDataDto } from './dto/save-store-data.dto';
import { SaveContactDataDto } from './dto/save-contact-data.dto';
import { SaveAccountDataDto } from './dto/save-account-data.dto';
import { SaveBusinessDataDto } from './dto/save-business-data.dto';

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
   * @param userService Injected instance of UserService
   * @param authService Injected instance of AuthService
   */
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * POST /v1/sellers/
   *
   * @param createSellerDto CreateSellerDto
   */
  @Post()
  @ApiOperation({
    summary: '판매자 생성',
    description: '핀메지를 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨' })
  async create(@Body() createSellerDto: CreateSellerDto): Promise<void> {
    this.logger.log(`POST /v1/sellers/`);
    this.logger.log(`> body = ${JSON.stringify(createSellerDto)}`);

    // 1. Get or create account
    const { id: accountId } = await this.authService.getOrCreateAccount(
      createSellerDto.email,
      createSellerDto.password,
    );

    // 2. Create seller
    const { id: sellerId } = await this.userService.createSeller(createSellerDto);

    // 3. Link seller with account
    await this.authService.updateAccount(accountId, { sellerId });
  }

  /**
   * GET /v1/sellers/
   *
   * @param query ListSellers
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Staff, UserType.Seller)
  @ApiOperation({
    summary: '판매자 목록 및 검색',
    description: '판매자 목록을 가져오거나 검색한다.',
  })
  @ApiOkResponse()
  async find(@Query() query: ListSellers): Promise<void> {
    this.logger.log(`GET /v1/sellers/`);
    this.logger.log(`> query = ${JSON.stringify(query)}`);

    // TODO
    // return await this.userService.listSellers(query);
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

    return this.userService.getSeller(id);
  }

  /**
   * PATCH /v1
   *
   * @param req             Request object
   * @param id              Seller ID
   * @param updateSellerDto UpdateSellerDto
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Admin, UserType.Staff)
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

    if (updateSellerDto.password) {
      const accountId = req.user.id;
      await this.authService.updateAccount(accountId, { password: updateSellerDto.password });
    }
    await this.userService.updateSeller(id, updateSellerDto);
  }

  /**
   * POST /v1/sellers/:id/upload/
   *
   * @param id  Seller ID
   * @param req Request object
   * @param res Reply object
   */
  @Post(':id/upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Seller)
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
    @Req() req: FastifyRequest,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Seller)
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

    await this.userService.saveSellerStoreData(id, saveStoreDataDto);

    const updateSellerDto = new UpdateSellerDto();
    updateSellerDto.storeDataStatus = SellerDataStatus.Submitted;
    await this.userService.updateSeller(id, updateSellerDto);
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
  async getStoreData(@Param('id') id: string): Promise<SellerStoreData> {
    this.logger.log(`GET /v1/sellers/${id}/store-data/`);

    return await this.userService.getSellerStoreData(id);
  }

  /**
   * PUT /v1/sellers/:id/contact-data/
   *
   * @param req                 Request object
   * @param id                  Seller ID
   * @param saveContactDataDto  SaveContactDataDto
   */
  @Put(':id/contact-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Seller)
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

    if (req.user.id !== id) {
      throw new ForbiddenException();
    }

    await this.userService.saveSellerContactData(id, saveContactDataDto);

    const updateSellerDto = new UpdateSellerDto();
    updateSellerDto.contactDataStatus = SellerDataStatus.Submitted;
    await this.userService.updateSeller(id, updateSellerDto);
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
  async getContactData(@Param('id') id: string): Promise<SellerContactData> {
    this.logger.log(`GET /v1/sellers/${id}/contact-data/`);

    return await this.userService.getSellerContactData(id);
  }

  @Put(':id/account-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Seller)
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

    await this.userService.saveSellerAccountData(id, saveAccountDataDto);

    const updateSellerDto = new UpdateSellerDto();
    updateSellerDto.accountDataComment = SellerDataStatus.Submitted;
    await this.userService.updateSeller(id, updateSellerDto);
  }

  @Get(':id/account-data')
  @ApiOperation({
    summary: '정산 정보 상세',
    description: '정산 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  async getAccountData(@Param('id') id: string): Promise<SellerAccountData> {
    this.logger.log(`GET /v1/sellers/${id}/account-data/`);

    return await this.userService.getSellerAccountData(id);
  }

  @Put(':id/business-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserTypes(UserType.Seller)
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

    await this.userService.saveSellerBusinessData(id, saveBusinessDataDto);

    const updateSellerDto = new UpdateSellerDto();
    updateSellerDto.businessDataStatus = SellerDataStatus.Submitted;
    await this.userService.updateSeller(id, updateSellerDto);
  }

  @Get(':id/business-data')
  @ApiOperation({
    summary: '사업자 정보 상세',
    description: '사업자 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  async getBusinessData(@Param('id') id: string): Promise<SellerBusinessData> {
    this.logger.log(`GET /v1/sellers/${id}/business-data/`);

    return await this.userService.getSellerBusinessData(id);
  }
}
