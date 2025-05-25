import { Body, Controller, HttpCode, HttpStatus, Logger, LoggerService, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.decorator";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  logger: LoggerService = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post("logout")
  // async logout(@Request() req: AuthRequest) {
  //   this.logger.log("Logout", req);
  //   const logoutAsync = promisify(req.logout.bind(req));
  //   return await logoutAsync();
  // }

  // @Get("profile")
  // getProfile(@Request() req: AuthRequest) {
  //   return req.user;
  // }
}
