// src/utils/hash.ts
import * as crypto from 'crypto';


export function hashPassword(password: string): { hash: Buffer; salt: Buffer } {
  // Buat salt secara manual
  const salt = crypto.randomBytes(64); // 512 bit = 64 bytes
  const hash = crypto.createHmac('sha512', salt).update(password).digest();

  return { hash, salt };
}


export function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string
): boolean {
  try {
    // Pastikan storedHash dan storedSalt adalah string
    if (typeof storedHash !== 'string' || typeof storedSalt !== 'string') {
      return false;
    }

    // Konversi dari string hex ke Buffer
    const saltBuffer = Buffer.from(storedSalt, 'hex');
    const hashBuffer = Buffer.from(storedHash, 'hex');

    // Hitung ulang hash dari password yang dimasukkan
    const hmac = crypto.createHmac('sha512', saltBuffer);
    const computedHash = hmac.update(password).digest();

    // Bandingkan hash
    return crypto.timingSafeEqual(computedHash, hashBuffer);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}



