import {
  Controller,
  UseGuards,
  Get,
  Post,
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
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { ListStaffs } from './dto/list-staffs.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './types/staff';

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
   *
   * @param staffsService Injected instance of StaffsService
   */
  constructor(private readonly staffsService: StaffsService) {}

  /**
   * GET /v1/staffs/hello/
   */
  @Get('hello')
  hello() {
    this.logger.log(`GET /v1/staffs/hello/`);
    return this.staffsService.hello();
  }

  @Post()
  @ApiOperation({
    summary: '직원 생성',
    description: '직원 계정을 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨' })
  async create(@Body() createStaffDto: CreateStaffDto): Promise<void> {
    this.logger.log(`POST /v1/staffs/`);
    this.logger.log(`> body = ${JSON.stringify(createStaffDto)}`);

    await this.staffsService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({
    summary: '직원 목록 및 검색',
    description: '직원 목록을 가져오거나 검색한다.',
  })
  @ApiOkResponse({ description: '정상' })
  async find(@Query() query: ListStaffs) {
    this.logger.log(`GET /v1/staffs/`);
    this.logger.log(`> query = ${JSON.stringify(query)}`);

    // TODO
    // return await this.userService.listStaffs(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: '직원 정보 상세',
    description: '직원 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '정상' })
  @ApiNotFoundResponse({ description: '직원 정보를 찾을 수 없음' })
  async findOne(@Param('id') id: string): Promise<Staff> {
    this.logger.log(`GET /v1/staffs/${id}`);

    return await this.staffsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: '직원 정보 수정',
    description: '직원 정보를 수정한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '정상적으로 변경됨' })
  async update(@Req() req: any, @Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    this.logger.log(`PATCH /v1/staffs/${id}`);
    this.logger.log(`> body = ${JSON.stringify(updateStaffDto)}`);

    await this.staffsService.update(id, updateStaffDto);
  }

  // TODO: admin only
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
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
