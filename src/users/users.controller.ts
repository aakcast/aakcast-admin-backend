import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  SetMetadata,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  ListAllUsers,
  FindByMobile,
  ResetPasswordDto,
} from './dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  /**
   * Constructor
   *
   * @param usersService  Injected instance of UsersService
   */
  constructor(private readonly usersService: UsersService) {}

  // login/logout
  // https://docs.nestjs.com/security/authentication#implementing-passport-jwt

  // 임시 로그인
  //  mobile, OTP를 통해 임시 로그인 (타임아웃 10분)
  //  JWT 발급 -> 이메일 및 가입일만 포함

  // @Get('find')
  // findByMobile(@Query() query: FindByMobile) {
  //   // auth: OTP 발급 요청
  //   // auth: 임시 인증 (전화번호, OTP)
  //   // JWT 가지고 하기
  //   // return this.usersService.findByMobile(query.mobile, query.code);
  // }

  @Post()
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse()
  find(@Query() query: ListAllUsers) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiNoContentResponse()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Put(':id/activate')
  @SetMetadata('roles', ['admin'])
  @ApiBearerAuth()
  @ApiNoContentResponse()
  activate(@Param('id', ParseIntPipe) id: number) {
    // return this.usersService.setStatus(id, 'active');
  }

  @Put(':id/deactivate')
  @SetMetadata('roles', ['admin'])
  @ApiBearerAuth()
  @ApiNoContentResponse()
  deactivate(@Param('id', ParseIntPipe) id: number) {
    // return this.usersService.setStatus(id, 'inactive');
  }

  @Put(':id/reset-password')
  @ApiNoContentResponse()
  resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ResetPasswordDto,
  ) {}
}
