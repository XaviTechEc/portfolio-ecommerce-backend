import { Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { SignInUserDto, CreateUserDto } from 'src/core/dtos';
import { IUser } from 'src/core/entities';
import { IAuthResponse } from 'src/core/interfaces/auth/auth-response.interface';

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
