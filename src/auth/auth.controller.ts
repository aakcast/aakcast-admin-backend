import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  Req,
  Query,
  Body,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { SmsService } from '../notifications/sms/sms.service';
import { LocalAuthGuard } from '../core/guards/local-auth.guard';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CredentialDto } from './dto/credential.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { LoginOtpDto } from './dto/login-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { TokenDescriptorDto } from './dto/token-descriptor.dto';

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
   * @param configService Injected instance of ConfigService
   * @param jwtService    Injected instance of JwtService
   * @param usersService  Injected instance of UsersService
   * @param smsService    Injected instance of SmsService
   * @param authService   Injected instance of AuthService
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly smsService: SmsService,
    private readonly authService: AuthService,
  ) {}

  /**
   * GET /v1/auth/hello/
   */
  @Get('hello')
  @ApiOperation({
    summary: 'Hello',
    description: 'API의 상태를 확인한다.',
  })
  @ApiOkResponse({ description: '정상' })
  @ApiInternalServerErrorResponse({ description: '서비스 접속 불가' })
  hello() {
    this.logger.log(`GET /v1/auth/hello/`);
    return this.authService.hello();
  }

  /**
   * GET /v1/auth/verify-email/
   * @param verifyEmailDto  VerifyEmailDto
   */
  @Get('verify-email')
  @ApiOperation({
    summary: '이메일 확인',
    description: '이메일의 가입 여부를 확인한다.',
  })
  @ApiOkResponse({ description: '성공', type: EmailVerificationDto })
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<EmailVerificationDto> {
    this.logger.log(`GET /v1/auth/verify-email/`);
    this.logger.log(`> query = ${JSON.stringify(verifyEmailDto)}`);

    const { email } = verifyEmailDto;

    // 판매자 계정에 대해서만 지원하는 것으로 한다. 직원 계정에도 적용 시 계정 타입을 입력 받도록 한다.
    const seller = await this.usersService.findOneByEmail('seller', email);
    const exists = seller !== null && seller !== undefined;

    return new EmailVerificationDto(email, exists);
  }

  /**
   * POST /v1/auth/login/
   * @param req   Request object
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호를 통해 로그인하고 JWT 토큰을 발급받는다.',
  })
  @ApiBody({ type: CredentialDto })
  @ApiOkResponse({ description: '성공', type: TokenDescriptorDto })
  @ApiUnauthorizedResponse({ description: '존재하지 않는 이메일 또는 비밀번호 불일치' })
  login(@Req() req: any): TokenDescriptorDto {
    this.logger.log(`POST /v1/auth/login/`);
    this.logger.log(`> req.user = ${JSON.stringify(req.user)}`);

    const { id: sub, ...data } = req.user;
    const expiresIn = this.configService.get<string>('ACCESS_TOKEN_LIFETIME', '3d');

    const token = this.jwtService.sign({ sub, ...data }, { expiresIn });
    this.logger.log(`>> token generated: ${token}`);

    return new TokenDescriptorDto(token);
  }

  /**
   * POST /v1/auth/request-otp/
   * @param requestOtpDto RequestOtpDto
   */
  @Post('request-otp')
  @HttpCode(204)
  @ApiOperation({
    summary: '인증코드 발급',
    description: '6자리 일회용 인증코드를 발급하고 사용자 핸드폰으로 전송한다.',
  })
  @ApiNoContentResponse({ description: '정상적으로 처리됨' })
  @ApiNotFoundResponse({ description: '핸드폰 정보를 찾을 수 없음' })
  async requestOtp(@Body() requestOtpDto: RequestOtpDto): Promise<void> {
    this.logger.log(`POST /v1/auth/request-otp/`);
    this.logger.log(`> body = ${JSON.stringify(requestOtpDto)}`);

    const { mobile } = requestOtpDto;
    const digits = 6;

    // Create OTP with mobile
    // 판매자 계정에 대해서만 지원하는 것으로 한다. 직원 계정에도 적용 시 계정 타입을 입력 받도록 한다.
    const { code } = await this.authService.issueTemporaryCredentials('seller', mobile, digits);
    this.logger.log(`>> OTP created: ${mobile} [${code}]`);

    // Send code to user's mobile
    const body = `[aakcast] 인증번호는 [${code}] 입니다.`;
    const to = `+82${mobile}`;
    await this.smsService.send(body, to);
  }

  /**
   * POST /v1/auth/login-otp/
   * @param loginOtpDto LoginOtpDto
   */
  @Post('login-otp')
  @ApiOperation({
    summary: '인증코드로 로그인',
    description:
      '핸드폰 번호와 인증코드를 통해 임시 자격으로 로그인한다. 이메일을 제공하여 로그인 한 경우 비밀번호 변경 권한이 주어지고 그렇지 않은 경우 계정 정보만 확인할 수 있다.',
  })
  @ApiOkResponse({ description: '성공', type: TokenDescriptorDto })
  @ApiNotFoundResponse({
    description: '핸드폰 정보를 찾을 수 없거나 또는 핸드폰가 일치하지 않음 (이메일 제공 시에만)',
  })
  @ApiUnauthorizedResponse({ description: '잘못된 인증번호이거나 인증 시간이 초과됨' })
  async loginWithOtp(@Body() loginOtpDto: LoginOtpDto): Promise<TokenDescriptorDto> {
    this.logger.log(`POST /auth/login-otp/`);
    this.logger.log(`> body = ${JSON.stringify(loginOtpDto)}`);

    const { mobile, code } = loginOtpDto;

    // 판매자 계정에 대해서만 지원하는 것으로 한다. 직원 계정에도 적용 시 계정 타입을 입력 받도록 한다.
    const auth = await this.authService.validateTemporaryCredentials('seller', mobile, code);
    this.logger.log(`>> user authorized: ${JSON.stringify(auth)}`);

    const { id: sub, ...data }: UserDto = auth;
    const token = this.jwtService.sign({ sub, ...data }, { expiresIn: '10m' }); // available for 10 minutes
    this.logger.log(`>> token generated: ${token}`);

    return new TokenDescriptorDto(token);
  }

  /**
   * POST /v1/auth/reset-password/
   * @param req               Request object
   * @param resetPasswordDto  ResetPasswordDto
   */
  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '비밀번호 재설정',
    description: '이메일과 인증코드를 이용하여 비밀번호를 재설정한다.',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: '성공' })
  @ApiNotFoundResponse({ description: '핸드폰 정보를 찾을 수 없음' })
  @ApiUnauthorizedResponse({ description: '잘못된 인증번호이거나 인증 시간이 초과됨' })
  @ApiConflictResponse({ description: '변경하려는 비밀번호가 현재 비밀번호와 동일함' })
  async resetPassword(@Req() req: any, @Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    this.logger.log(`POST /auth/reset-password/`);
    this.logger.log(`> body = ${JSON.stringify(resetPasswordDto)}`);

    const { type, email }: UserDto = req.user;

    await this.usersService.resetPassword(type, email, resetPasswordDto.password);
  }
}
