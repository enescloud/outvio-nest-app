/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CurrentUser } from '../types/auth.types';

@Injectable()

/* The JwtAuthGuard class is a custom authentication guard that extends the AuthGuard class and handles
JWT authentication logic. */
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: CurrentUser, info: { message: string }): any {
    if (err || !user) {
      if (info.message === 'jwt expired') {
        throw new UnauthorizedException('JWT is expired, please take new one.');
      }

      if (err) {
        this.logger.error(`Error in JwtAuthGuard: `, err);
      }
      console.log('user:', user);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
