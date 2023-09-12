import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';

export abstract class IAuthDataSourceService {
  // Auth
  abstract auth: IAuthRepository;
}
