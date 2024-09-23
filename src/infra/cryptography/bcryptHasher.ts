import { hash } from 'bcrypt';
import { HashGenerator } from '@/domain/cryptography/hashGenerator';

export class BcryptHasher implements HashGenerator {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }
}
