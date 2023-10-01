import { Injectable } from '@nestjs/common';
import { IHashService } from 'src/common/domain/abstracts/services';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService implements IHashService {
  private readonly _rounds: number = 10;

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this._rounds);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
  }

  async compare(data: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(data, hash);
    return isValid;
  }
}
