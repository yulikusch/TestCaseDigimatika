import { Controller, Post, Body,Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.validateUser(body.email, body.password);
  }
   @Post('logout')
  async logout(@Req() req: any) {
    return {
      message: 'Logout berhasil. Silakan hapus token di client.',
    };
  }
}
