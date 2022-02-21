import { Controller, UseGuards, Get, Req, Logger } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { User } from './grpc-clients/interfaces/auth.interface';

/**
 * Controller: App(root)
 */
@Controller()
@ApiTags('App')
export class AppController {
  /**
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(AppController.name);

  /**
   * Constructor
   *
   * @param appService  Injected instance of AuthService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * GET /v1/
   */
  @Get()
  @ApiOperation({
    summary: 'Hello',
    description: '백엔드의 동작 여부를 확인하기 위한 간단한 요청으로 사용한다.',
  })
  @ApiOkResponse({
    description: '정상',
  })
  async getHello(): Promise<string> {
    this.logger.log(`GET /v1/`);

    return this.appService.getHello();
  }

  /**
   * GET /v1/profile/
   *
   * @param req request object
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: '로그인 정보 확인',
    description: '로그인 상태 등을 확인하고 사용자의 간단한 정보를 확인할 수 있다.',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '성공',
  })
  @ApiUnauthorizedResponse({
    description: '로그인되지 않음',
  })
  getProfile(@Req() req: any): User {
    this.logger.log(`GET /v1/profile/`);
    this.logger.log(`> req.user = ${JSON.stringify(req.user)}`);

    return req.user;
  }
}
