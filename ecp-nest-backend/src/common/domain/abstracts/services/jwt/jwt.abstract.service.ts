import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';

export abstract class IJwtService {
  abstract verifyToken(token: string): Promise<IJwtPayload>;
  abstract signToken(payload: IJwtPayload): Promise<string>;
  abstract verifySync(token: string): IJwtPayload;
}
