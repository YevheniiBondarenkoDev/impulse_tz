import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqUser } from './req-user-extractor';
import { AuthDto, AuthResponse } from './dto/auth.dto';
import { Auth } from './auth.decorator';
import { TokenData } from './types';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LogoutResponse } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiCreatedResponse({ type: AuthResponse })
  @Post('login')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
  @ApiCreatedResponse({ type: AuthResponse })
  @Post('registration')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }
  @Auth()
  @Patch('logout')
  logout(@ReqUser() { userId }: TokenData): Promise<LogoutResponse> {
    return this.authService.logout(userId);
  }
}
