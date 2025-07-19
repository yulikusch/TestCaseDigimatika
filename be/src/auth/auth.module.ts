import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from '../sales/sales.entity';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sales]), // ✅ hanya ini cukup untuk inject Sales repository
    JwtModule.register({
      secret: 'RAHASIA_KAMU',
      signOptions: { expiresIn: '1d' },
    }),
    SalesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
