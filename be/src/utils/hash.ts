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
    if (typeof storedHash !== 'string' || typeof storedSalt !== 'string') {
      return false;
    }

    const saltBuffer = Buffer.from(storedSalt, 'hex');
    const hashBuffer = Buffer.from(storedHash, 'hex');

    const hmac = crypto.createHmac('sha512', saltBuffer);
    const computedHash = hmac.update(password).digest();

    return crypto.timingSafeEqual(computedHash, hashBuffer);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}



