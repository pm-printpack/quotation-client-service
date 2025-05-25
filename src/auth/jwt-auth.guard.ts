import { ExecutionContext, Injectable, IntrinsicException, Logger, LoggerService, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./auth.decorator";
import { AuthAdmin } from "./auth.type";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  logger: LoggerService = new Logger(JwtAuthGuard.name);
  
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<AuthAdmin>(err: IntrinsicException | null, admin: AuthAdmin | boolean, info: any): AuthAdmin {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !admin) {
      throw err || new UnauthorizedException();
    }
    return admin as AuthAdmin;
  }
}