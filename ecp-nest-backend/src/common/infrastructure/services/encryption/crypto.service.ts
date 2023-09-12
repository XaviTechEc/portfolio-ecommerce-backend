import { Injectable } from '@nestjs/common';
import { IEncryptService } from 'src/common/domain/abstracts/services';

@Injectable()
export class CryptoService implements IEncryptService {
  encryptData(
    textToEncrypt: string,
    algorithm: string,
    key: string | Buffer,
    iv: string | Buffer,
  ): Promise<string | Buffer> {
    throw new Error('Method not implemented.');
  }
  decryptData(
    encryptedText: string | Buffer,
    algorithm: string,
    key: string | Buffer,
    iv: string | Buffer,
  ): Promise<string | Buffer> {
    throw new Error('Method not implemented.');
  }
}
