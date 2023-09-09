import { CreateUserDto, SignInUserDto } from 'src/core/dtos';
import { IUser } from 'src/core/entities';
import { IAuthResponse } from 'src/core/interfaces/auth/auth-response.interface';

export abstract class IAuthRepository {
  abstract signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse>;
  abstract register(createUserDto: CreateUserDto): Promise<IAuthResponse>;
  abstract checkAuthStatus(user: IUser): Promise<IAuthResponse>;
}
