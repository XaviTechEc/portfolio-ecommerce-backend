import { Injectable } from '@nestjs/common';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IAuthResponse } from 'src/auth/domain/interfaces/auth-response.interface';
import { IUsersDataSourceService } from 'src/users/domain/abstracts/services/users-datasource.abstract.service';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { UserFactoryService } from '../../../users/application/use-cases/factory/user-factory.service';
import { IGoogleUser } from 'src/auth/domain/interfaces/google-user.interface';

@Injectable()
export class AuthUseCases {
  constructor(
    private authDataService: IAuthDataSourceService,
    private userFactoryService: UserFactoryService,
  ) {}

  async signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse> {
    return this.authDataService.auth.signIn(signInUserDto);
  }

  async register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const newUser = this.userFactoryService.createUser(createUserDto);
    return this.authDataService.auth.register(newUser);
  }

  async checkAuthStatus(token: string): Promise<IAuthResponse> {
    return this.authDataService.auth.checkAuthStatus(token);
  }

  async googleLoginCallback(user: IGoogleUser): Promise<IAuthResponse> {
    const newUser = this.userFactoryService.createGoogleUser(user);
    return this.authDataService.auth.googleLogin(newUser);
  }

  async validateUserForJwtStrategy(uid: string): Promise<IUser> {
    return this.authDataService.auth.validateUserForJwtStrategy(uid);
  }

  async validateUserLocal(
    email: string,
    password: string,
  ): Promise<IUser | null> {
    return this.authDataService.auth.validateUserLocal(email, password);
  }

  async renewToken(token: string): Promise<IAuthResponse> {
    return this.authDataService.auth.renewToken(token);
  }
}
