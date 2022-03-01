import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard: LocalAuth
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
