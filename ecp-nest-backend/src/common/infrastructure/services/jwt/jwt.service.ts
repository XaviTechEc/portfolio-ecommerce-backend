import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/core/abstracts/services';
import { IJwtPayload } from 'src/core/interfaces/strategies/jwt/jwt-payload.interface';

@Injectable()
export class MyJwtService implements IJwtService {
  constructor(private jwtService: JwtService) {}

  async verifyToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }
  async signToken(payload: IJwtPayload): Promise<string> {
    const token = this.jwtService.signAsync(payload);
    return token;
  }
}
