import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { SignInUserDto } from '../../dtos/rest/sign-in-user.dto';
import { IAuthResponse } from '../../interfaces/auth-response.interface';

export abstract class IAuthRepository {
  abstract signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse>;
  abstract register(createUserDto: CreateUserDto): Promise<IAuthResponse>;
  abstract checkAuthStatus(token: string): Promise<IAuthResponse>;
  abstract googleLogin(user: IUser): Promise<IAuthResponse>;
  abstract validateUserLocal(
    email: string,
    password: string,
  ): Promise<IUser | null>;

  abstract validateUserForJwtStrategy(id: string): Promise<IUser>;

  abstract renewToken(token: string): Promise<IAuthResponse>;
}
