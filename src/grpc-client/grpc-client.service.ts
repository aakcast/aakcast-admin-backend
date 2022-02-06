import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   mobile: string;
//   department: string;
//   password: string;
// }
//
// interface UserService {
//   getUser(id: string): Observable<User>;
// }

interface Credentials {
  username: string;
  password: string;
}

interface TokenResponse {
  type: string;
  token: string;
}

interface AuthService {
  requestToken(Credentials): Observable<TokenResponse>;
}

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private authService: AuthService;

  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.userClient.getService<AuthService>('AuthService');
  }

  async test() {
    console.log('GrpcClientService.test');
    const response$ = this.authService.requestToken({
      username: 'mankiplayer@gmail.co',
      password: '/aksrldi09a!',
    });
    console.log(await lastValueFrom(response$));
  }
}
