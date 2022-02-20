import { Controller, Post, Body, Req, UseGuards, HttpCode, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthService } from '../grpc-clients/services/auth.service';
import { Authentication } from '../grpc-clients/interfaces/auth.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { LoginOtpDto } from './dto/login-otp.dto';

/**
 * Controller: Auth
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  /**
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(AuthController.name);

  /**
   * Constructor
   *
   * @param authService Injected instance of AuthService
   * @param jwtService  Injected instance of JwtService
   */
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  /**
   * Request handler - POST /auth/login/
   *
   * @param req   request object
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호를 통해 로그인하고 JWT 토큰을 발급받는다.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: '로그인 성공' })
  @ApiUnauthorizedResponse({ description: '로그인 실패' })
  @ApiNotFoundResponse({ description: '존재하지 않는 이메일' })
  login(@Req() req: any) {
    this.logger.log(`POST /auth/login/`);
    this.logger.log(`> req.user = ${JSON.stringify(req.user)}`);

    const { id: sub, ...data }: Authentication = req.user;
    const token = this.jwtService.sign({ sub, ...data });
    this.logger.log(`>> token generated: ${token}`);

    return {
      scheme: 'bearer',
      format: 'JWT',
      token,
    };
  }

  /**
   * Request handler - POST /auth/request-otp/
   *
   * @param body  request body
   */
  @Post('request-otp')
  @HttpCode(204)
  @ApiOperation({
    summary: '인증코드 발급',
    description: '6자리 일회용 인증코드를 발급하고 사용자 핸드폰으로 전송한다.',
  })
  @ApiBody({ type: RequestOtpDto })
  @ApiNoContentResponse({ description: '정상적으로 처리됨' })
  @ApiNotFoundResponse({ description: '핸드폰 정보를 찾을 수 없음' })
  async requestOtp(@Body() body: RequestOtpDto): Promise<void> {
    this.logger.log(`POST /auth/request-otp/`);
    this.logger.log(`> body = ${JSON.stringify(body)}`);

    const { mobile } = body;

    // Create OTP with mobile
    const otp = await this.authService.createTemporaryCredentials(mobile, 6);
    this.logger.log(`>> OTP created: ${mobile} [${otp.code}]`);

    // TODO: to be triggered by event
    // const message = `[aakcast] 인증번호는 [${code}] 입니다.`;
    // const empty$ = this.notificationService.sendSms({ mobile, message });
    // await lastValueFrom(empty$);
  }

  /**
   * Request handler - POST /auth/login-otp/
   *
   * @param body  request body
   */
  @Post('login-otp')
  @ApiOperation({
    summary: '인증코드로 로그인',
    description:
      '사용자 핸드폰으로 전송된 일회용 인증코드를 통해 임시 자격으로 로그인한다. 이 후 본인 계정 정보를 확인하거나 비밀번호를 변경할 수 있다.',
  })
  @ApiOkResponse({ description: '로그인 성공' })
  @ApiUnauthorizedResponse({ description: '로그인 실패' })
  @ApiNotFoundResponse({ description: '임시 자격 정보를 찾을 수 없거나 이미 만료됨' })
  async loginWithOtp(@Body() body: LoginOtpDto) {
    this.logger.log(`POST /auth/login-otp/`);
    this.logger.log(`> body = ${JSON.stringify(body)}`);

    const { mobile, code } = body;

    const auth = await this.authService.validateTemporaryCredentials(mobile, code);
    const token = this.jwtService.sign(auth);
    this.logger.log(`>> token generated: ${token}`);

    return {
      scheme: 'bearer',
      format: 'JWT',
      token,
    };
  }
}
