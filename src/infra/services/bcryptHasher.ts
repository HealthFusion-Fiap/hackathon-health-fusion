import { hash, compareSync } from 'bcrypt';
import { HashGenerator } from '@/domain/services/hashGenerator';

export class BcryptHasher implements HashGenerator {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compareSync(plain: string, digest: string): boolean {
    return compareSync(plain, digest);
  }
}
