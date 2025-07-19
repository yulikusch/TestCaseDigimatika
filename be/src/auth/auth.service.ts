import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from '../sales/sales.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'; 
import { verifyPassword } from '../utils/hash';


 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Sales)
    private userRepo: Repository<Sales>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    if (!user.level || user.level === 'NULL') {
      throw new UnauthorizedException('Menunggu persetujuan admin');
    }

    if (!verifyPassword(password, user.password, user.passwordsalt)) {
      throw new UnauthorizedException('Password salah');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = this.generateJwt(user.email, user.nama, user.level, otp);

    // Opsional: kirim OTP pakai nodemailer/mailer
    console.log(`OTP ke ${user.email}: ${otp}`);

    return {
      message: 'Login berhasil',
      name: user.nama,
      email: user.email,
      level: user.level,
      token,
    };
  }

  generateJwt(email: string, name: string, level: string, otp: string): string {
    return jwt.sign({ email, name, level, otp }, 'secretKey', { expiresIn: '1h' });
  }
}
