import { Injectable } from '@nestjs/common';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IAuthResponse } from 'src/auth/domain/interfaces/auth-response.interface';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class AuthUseCases {
  constructor(private dataServices: IAuthDataSourceService) {}

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
