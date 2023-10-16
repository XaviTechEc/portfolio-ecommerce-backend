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
    private usersDataServices: IUsersDataSourceService,
  ) {}

  signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse> {
    return this.authDataService.auth.signIn(signInUserDto);
  }
  register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    const newUser = this.userFactoryService.createUser(createUserDto);
    return this.authDataService.auth.register(newUser);
  }
  checkAuthStatus(user: IUser): Promise<IAuthResponse> {
    return this.authDataService.auth.checkAuthStatus(user);
  }

  googleLoginCallback(user: IGoogleUser): Promise<IAuthResponse> {
    const newUser = this.userFactoryService.createGoogleUser(user);
    return this.authDataService.auth.googleLogin(newUser);
  }

  validateUserForJwtStrategy(uid: string): Promise<IUser> {
    return this.usersDataServices.users.getShortUserById(uid);
  }
}
