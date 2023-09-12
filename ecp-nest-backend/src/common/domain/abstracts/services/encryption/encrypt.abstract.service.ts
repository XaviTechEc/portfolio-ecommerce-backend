export abstract class IEncryptService {
  abstract encryptData(
    textToEncrypt: string,
    algorithm: string,
    key: string | Buffer,
    iv: string | Buffer,
  ): Promise<string | Buffer>;

  abstract decryptData(
    encryptedText: string | Buffer,
    algorithm: string,
    key: string | Buffer,
    iv: string | Buffer,
  ): Promise<string | Buffer>;
}
