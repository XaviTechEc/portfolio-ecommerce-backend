import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/common/domain/abstracts/services';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';

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
