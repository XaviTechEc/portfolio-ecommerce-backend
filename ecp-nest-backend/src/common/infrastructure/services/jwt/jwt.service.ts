import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/common/domain/abstracts/services';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';
import { EnvironmentConfigService } from '../../../../configuration/env/env-config.service';

@Injectable()
export class MyJwtService implements IJwtService {
  constructor(
    private jwtService: JwtService,
    private environmentConfigService: EnvironmentConfigService,
  ) {}

  verifySync(token: string): IJwtPayload {
    try {
      const decode = this.jwtService.verify(token, {
        secret: this.environmentConfigService.getJwtSecret(),
      });
      return decode;
    } catch (error) {
      return null;
    }
  }

  async verifyToken(token: string): Promise<IJwtPayload> {
    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: this.environmentConfigService.getJwtSecret(),
      });
      return decode;
    } catch (error) {
      return null;
    }
  }

  async signToken(payload: IJwtPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
