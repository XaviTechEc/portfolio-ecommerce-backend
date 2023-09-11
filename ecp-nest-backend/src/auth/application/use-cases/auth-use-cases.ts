import { Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IAuthResponse } from 'src/auth/domain/interfaces/auth-response.interface';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class AuthUseCases implements IAuthRepository {
  constructor(private dataServices: IDataSourcesService) {}

  signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse> {
    return this.dataServices.auth.signIn(signInUserDto);
  }
  register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    return this.dataServices.auth.register(createUserDto);
  }
  checkAuthStatus(user: IUser): Promise<IAuthResponse> {
    return this.dataServices.auth.checkAuthStatus(user);
  }
}
