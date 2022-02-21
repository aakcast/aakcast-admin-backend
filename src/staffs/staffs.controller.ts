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
import { UserService } from '../grpc-clients/services/user.service';
import { AuthService } from '../grpc-clients/services/auth.service';
import { Staff } from '../grpc-clients/interfaces/user.interface';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { CreateStaffDto } from './dto/create-staff.dto';
import { ListStaffs } from './dto/list-staffs.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

/**
 * Controller: Staffs
 */
@Controller('staffs')
@ApiTags('Staffs')
export class StaffsController {
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
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(StaffsController.name);

  @Post()
  @ApiOperation({
    summary: '직원 생성',
    description: '직원 계정을 생성한다.',
  })
  @ApiCreatedResponse({ description: '정상 생성됨' })
  async create(@Body() createStaffDto: CreateStaffDto): Promise<void> {
    this.logger.log(`POST /v1/staffs/`);
    this.logger.log(`> body = ${JSON.stringify(createStaffDto)}`);

    // 1. Get or create account
    const { id: accountId } = await this.authService.getOrCreateAccount(
      createStaffDto.email,
      createStaffDto.password,
    );

    // 2. Create staff
    const { id: staffId } = await this.userService.createStaff(createStaffDto);

    // 3. Link seller with account
    await this.authService.updateAccount(accountId, { staffId });
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

    return await this.userService.getStaff(id);
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

    if (updateStaffDto.password) {
      const accountId = req.user.id;
      await this.authService.updateAccount(accountId, { password: updateStaffDto.password });
    }
    await this.userService.updateStaff(id, updateStaffDto);
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

    await this.userService.deleteStaff(id);
  }
}
