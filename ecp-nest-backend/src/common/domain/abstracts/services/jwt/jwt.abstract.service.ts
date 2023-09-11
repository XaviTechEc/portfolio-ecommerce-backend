import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';

export abstract class IJwtService {
  abstract verifyToken(token: string): Promise<any>;
  abstract signToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
