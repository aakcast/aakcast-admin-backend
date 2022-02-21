import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard: JwtAuth
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
