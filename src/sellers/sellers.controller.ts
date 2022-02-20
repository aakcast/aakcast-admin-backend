import {
  Body,
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Patch,
  Req,
  Param,
  Query,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../grpc-clients/services/user.service';
import { AuthService } from '../grpc-clients/services/auth.service';
import {
  Seller,
  SellerDataStatus,
  SellerStoreData,
  SellerContactData,
  SellerAccountData,
  SellerBusinessData,
} from '../grpc-clients/interfaces/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

  @Get()
  @ApiOperation({
    summary: '유저 목록 및 검색',
    description: '유저 목록을 가져오거나 검색한다.',
  })
  @ApiOkResponse()
  async find(@Query() query: ListSellers) {
    this.logger.log(`GET /v1/sellers/`);
    this.logger.log(`> query = ${JSON.stringify(query)}`);

    // TODO
    // return await this.userService.listSellers(query);
  }

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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스토어 정보 저장',
    description: '[벤더 전용] 스토어 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @Put(':id/store-data')
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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '셀러 정보 저장',
    description: '[벤더 전용] 셀러 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @Put(':id/contact-data')
  @ApiNoContentResponse({ description: '정상 처리됨' })
  async saveContactData(
    @Param('id') id: string,
    @Body() saveContactDataDto: SaveContactDataDto,
  ): Promise<void> {
    this.logger.log(`PUT /v1/sellers/${id}/contact-data/`);
    this.logger.log(`> body = ${JSON.stringify(saveContactDataDto)}`);

    await this.userService.saveSellerContactData(id, saveContactDataDto);

    const updateSellerDto = new UpdateSellerDto();
    updateSellerDto.contactDataStatus = SellerDataStatus.Submitted;
    await this.userService.updateSeller(id, updateSellerDto);
  }

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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '정산 정보 저장',
    description: '[벤더 전용] 정산 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @Put(':id/account-data')
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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '사업자 정보 저장',
    description: '[벤더 전용] 사업자 정보를 저장한다.',
  })
  @ApiBearerAuth()
  @Put(':id/business-data')
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
