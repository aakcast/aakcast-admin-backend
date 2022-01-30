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
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  ListAllUsers,
  FindByMobile,
  ResetPasswordDto,
} from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // login/logout
  // https://docs.nestjs.com/security/authentication#implementing-passport-jwt

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: ListAllUsers) {
    return this.usersService.findAll(query);
  }

  @Get('find')
  findByMobile(@Query() query: FindByMobile) {
    // auth: OTP 발급 요청
    // auth: 임시 인증 (전화번호, OTP)
    // JWT 가지고 하기
    // return this.usersService.findByMobile(query.mobile, query.code);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Put(':id/activate')
  @SetMetadata('roles', ['admin'])
  activate(@Param('id', ParseIntPipe) id: number) {
    // return this.usersService.setStatus(id, 'active');
  }

  @Put(':id/deactivate')
  @SetMetadata('roles', ['admin'])
  deactivate(@Param('id', ParseIntPipe) id: number) {
    // return this.usersService.setStatus(id, 'inactive');
  }

  @Put(':id/reset-password')
  resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ResetPasswordDto,
  ) {
    return this.usersService.update(id, { password: body.password });
  }
}
