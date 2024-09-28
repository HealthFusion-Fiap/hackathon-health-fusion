import jwt from 'jsonwebtoken';
import { Jwt } from '@/domain/services/jwt';

interface LoginProps {
  id: string
}

export class JwtGenerate implements Jwt {
  private readonly secret = process.env.JWT_SECRET as string;

  private readonly expiresIn = '7d';

  sign(payload: object | string | Buffer): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  login(token: string): string | null {
    try {
      const authorization = jwt.verify(token, this.secret) as LoginProps;
      return authorization.id;
    } catch (error) {
      return null;
    }
  }
}
