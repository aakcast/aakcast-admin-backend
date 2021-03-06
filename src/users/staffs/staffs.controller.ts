import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Patch,
  Req,
  Param,
  Query,
  Body,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../core/decorators/api-response.decorator';
import { UsersService } from '../users.service';
import { StaffsService } from './staffs.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { UuidDto } from '../../core/dto/uuid.dto';
import { FindDto } from '../../core/dto/find.dto';
import { FindPipe } from '../../core/pipes/find.pipe';
import { PaginatedDto } from '../../core/dto/paginated.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDto } from './dto/staff.dto';

/**
 * Controller: Staffs
 */
@Controller('staffs')
@ApiTags('Staffs')
export class StaffsController {
  /**
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(StaffsController.name);

  /**
   * Constructor
   * @param usersService  Injected instance of UsersService
   * @param staffsService Injected instance of StaffsService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly staffsService: StaffsService,
  ) {}

  /**
   * GET /v1/staffs/hello/
   */
  @Get('hello')
  @ApiOperation({
    summary: 'Hello',
    description: 'API의 상태를 확인한다.',
  })
  @ApiOkResponse({ description: '정상' })
  @ApiInternalServerErrorResponse({ description: '서비스 접속 불가' })
  hello() {
    this.logger.log(`GET /v1/staffs/hello/`);
    return this.usersService.hello();
  }

  /**
   * POST /v1/staffs/
   * @param createStaffDto  CreateStaffDto
   */
  @Post()
  @ApiOperation({
    summary: '직원 생성',
    description: '직원 계정을 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨', type: UuidDto })
  create(@Body() createStaffDto: CreateStaffDto): Promise<UuidDto> {
    this.logger.log(`POST /v1/staffs/`);
    this.logger.log(`> body = ${JSON.stringify(createStaffDto)}`);

    return this.staffsService.create(createStaffDto);
  }

  /**
   * GET /v1/staffs/
   * @param findDto FindDto
   */
  @Get()
  @ApiOperation({
    summary: '직원 목록 및 검색',
    description: '직원 목록을 가져오거나 검색한다.',
  })
  @ApiExtraModels(PaginatedDto)
  @ApiPaginatedResponse(StaffDto)
  find(@Query(FindPipe) findDto: FindDto): Promise<PaginatedDto<StaffDto>> {
    this.logger.log(`GET /v1/staffs/`);
    this.logger.log(`> query = ${JSON.stringify(findDto)}`);

    return this.staffsService.find(findDto);
  }

  /**
   * GET /v1/staffs/:id/
   * @param id  Staff ID
   */
  @Get(':id')
  @ApiOperation({
    summary: '직원 정보 상세',
    description: '직원 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상', type: StaffDto })
  @ApiNotFoundResponse({ description: '직원 정보를 찾을 수 없음' })
  findOne(@Param('id') id: string): Promise<StaffDto> {
    this.logger.log(`GET /v1/staffs/${id}`);

    return this.staffsService.findOne(id);
  }

  /**
   * PATCH /v1/staffs/:id/
   * @param req             Request object
   * @param id              Staff ID
   * @param updateStaffDto  UpdateStaffDto
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '직원 정보 수정',
    description: '직원 정보를 수정한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 수정됨' })
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<void> {
    this.logger.log(`PATCH /v1/staffs/${id}`);
    this.logger.log(`> body = ${JSON.stringify(updateStaffDto)}`);

    await this.staffsService.update(id, updateStaffDto);
  }

  /**
   * DELETE /v1/staffs/:id/
   * @param id  Staff ID
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '직원 계정 삭제',
    description: '직원 계정을 중지 상태로 만든다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상 삭제됨' })
  async delete(@Param('id') id: string): Promise<void> {
    this.logger.log(`DELETE /v1/staffs/${id}`);

    await this.staffsService.delete(id);
  }
}
